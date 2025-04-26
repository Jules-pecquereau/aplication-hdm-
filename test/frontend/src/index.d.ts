export type Task = {
  id: number;
  name: string;
  createdAt: string; // Assurez-vous que c'est une chaîne de date
  updatedAt: string; // Assurez-vous que c'est une chaîne de date
  status: 'à faire' | 'en cours' | 'terminée'; // Ajoutez cette propriété
};
