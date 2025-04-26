import { useState, useEffect } from 'react';
import { taskService } from '../services/taskService';
import './TaskList.css';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'à faire'
  });

  // Charger les tâches au chargement du composant
  useEffect(() => {
    loadTasks();
  }, []);

  // Récupérer toutes les tâches
  const loadTasks = async () => {
    try {
      setIsLoading(true);
      const data = await taskService.getAllTasks();
      setTasks(data);
      setError(null);
    } catch (err) {
      setError("Impossible de charger les tâches");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Gérer les changements dans le formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Gérer les changements de statut dans la liste des tâches
  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await taskService.updateTask(taskId, { status: newStatus });
      loadTasks(); // Recharge les tâches après la mise à jour
    } catch (err) {
      setError("Erreur lors de la mise à jour du statut");
      console.error(err);
    }
  };

  // Créer une nouvelle tâche
  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      await taskService.createTask(formData);
      setFormData({ title: '', description: '', status: 'à faire' });
      loadTasks(); // Recharger les tâches après création
    } catch (err) {
      setError("Erreur lors de la création de la tâche");
      console.error(err);
    }
  };

  // Commencer l'édition d'une tâche
  const startEditing = (task) => {
    setEditingTask(task.id);
    setFormData({
      title: task.title,
      description: task.description,
      status: task.status
    });
  };

  // Mettre à jour une tâche
  const handleUpdateTask = async (e) => {
    e.preventDefault();
    try {
      await taskService.updateTask(editingTask, formData);
      setEditingTask(null);
      setFormData({ title: '', description: '', status: 'à faire' });
      loadTasks(); // Recharger les tâches après mise à jour
    } catch (err) {
      setError("Erreur lors de la mise à jour de la tâche");
      console.error(err);
    }
  };

  // Supprimer une tâche
  const handleDeleteTask = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette tâche ?")) {
      try {
        await taskService.deleteTask(id);
        loadTasks(); // Recharger les tâches après suppression
      } catch (err) {
        setError("Erreur lors de la suppression de la tâche");
        console.error(err);
      }
    }
  };

  // Annuler l'édition
  const cancelEditing = () => {
    setEditingTask(null);
    setFormData({ title: '', description: '', status: 'à faire' });
  };

  if (isLoading) return <div>Chargement des tâches...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="task-manager">
      <h1>Gestionnaire de tâches</h1>
      
      {/* Formulaire de création/édition */}
      <div className="task-form">
        <h2>{editingTask ? 'Modifier la tâche' : 'Créer une nouvelle tâche'}</h2>
        <form onSubmit={editingTask ? handleUpdateTask : handleCreateTask}>
          <div className="form-group">
            <label htmlFor="title">Titre:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="status">Statut:</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="à faire">À faire</option>
              <option value="en cours">En cours</option>
              <option value="terminée">Terminée</option>
            </select>
          </div>
          
          <div className="form-buttons">
            <button type="submit">
              {editingTask ? 'Mettre à jour' : 'Créer'}
            </button>
            {editingTask && (
              <button type="button" onClick={cancelEditing}>
                Annuler
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Liste des tâches */}
      <div className="task-list">
        <h2>Liste des tâches</h2>
        {tasks.length === 0 ? (
          <p>Aucune tâche trouvée</p>
        ) : (
          <ul>
            {tasks.map((task) => (
              <li key={task.id} className={`task-item ${task.status}`}>
                <div className="task-content">
                  <h3>{task.title}</h3>
                  <p>{task.description}</p>
                  <div className="form-group">
                    <label htmlFor={`status-${task.id}`}>Statut:</label>
                    <select
                      id={`status-${task.id}`}
                      name="status"
                      value={task.status}
                      onChange={(e) => handleStatusChange(task.id, e.target.value)}
                    >
                      <option value="à faire">À faire</option>
                      <option value="en cours">En cours</option>
                      <option value="terminée">Terminée</option>
                    </select>
                  </div>
                </div>
                <div className="task-actions">
                  <button onClick={() => startEditing(task)}>Modifier</button>
                  <button 
                    onClick={() => handleDeleteTask(task.id)}
                    className="delete-btn"
                  >
                    Supprimer
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default TaskList;