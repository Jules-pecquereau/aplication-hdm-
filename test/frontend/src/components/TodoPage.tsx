import { Check, Delete } from '@mui/icons-material';
import { Box, Button, Container, IconButton, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch.ts';
import { Task } from '../index';
import '../../TodoPage.css';

const TodoPage = () => {
  const api = useFetch();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskName, setNewTaskName] = useState<string>(''); // Pour ajouter une nouvelle tâche

  // Récupérer toutes les tâches
  const handleFetchTasks = async () => {
    try {
      const fetchedTasks = await api.get('/tasks');
      setTasks(Array.isArray(fetchedTasks) ? fetchedTasks : []); // Vérifie que c'est un tableau
    } catch (error) {
      console.error('Erreur lors de la récupération des tâches :', error);
    }
  };

  // Supprimer une tâche
  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/tasks/${id}`);
      await handleFetchTasks(); // Rafraîchir la liste des tâches
    } catch (error) {
      console.error('Erreur lors de la suppression de la tâche :', error);
    }
  };

  // Ajouter une nouvelle tâche
  const handleSave = async () => {
    if (!newTaskName.trim()) return; // Empêche l'ajout de tâches vides
    try {
      await api.post('/tasks', { name: newTaskName });
      setNewTaskName(''); // Réinitialise le champ de saisie
      await handleFetchTasks(); // Rafraîchir la liste des tâches
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la tâche :', error);
    }
  };

  const handleStatusChange = async (id: number, status: string) => {
    try {
      await api.put(`/tasks/${id}`, { status });
      await handleFetchTasks(); // Rafraîchir la liste des tâches
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut de la tâche :', error);
    }
  };

  const startEditing = (task: Task) => {
    console.log('Start editing task:', task);
  };

  useEffect(() => {
    handleFetchTasks();
  }, []);

  return (
    <Container>
      <Box display="flex" justifyContent="center" mt={5}>
        <Typography variant="h2">HDM Todo List</Typography>
      </Box>

      <Box justifyContent="center" mt={5} flexDirection="column">
        <Typography variant="h4" gutterBottom>
          Liste des tâches
        </Typography>
        <ul>
          {tasks.map((task) => (
            <li key={task.id} className={`task-item ${task.status}`}>
              <div className="task-content">
                <h3>{task.name}</h3>
                <p>Ajoutée le : {new Date(task.createdAt).toLocaleString()}</p>
                <p>Dernière mise à jour : {new Date(task.updatedAt).toLocaleString()}</p>
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
                  onClick={() => handleDelete(task.id)}
                  className="delete-btn"
                >
                  Supprimer
                </button>
              </div>
            </li>
          ))}
        </ul>
      </Box>

      <Box display="flex" justifyContent="center" alignItems="center" mt={2} gap={1}>
        <TextField
          size="small"
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
          placeholder="Nouvelle tâche"
          sx={{ maxWidth: 350 }}
        />
        <Button variant="outlined" onClick={handleSave}>
          Ajouter une tâche
        </Button>
      </Box>

      
    </Container>
  );
};

export default TodoPage;
