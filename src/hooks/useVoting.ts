import { useState, useEffect } from 'react';
import { collection, doc, getDoc, setDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuth } from './useAuth';

export const useVoting = () => {
  const [votes, setVotes] = useState<Record<string, string>>({});
  const [hasVoted, setHasVoted] = useState<boolean>(false);
  const [results, setResults] = useState<Record<string, Record<string, number>>>({});
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  // Definir las categorías y sus opciones de respuesta
  const categories: Record<string, string[]> = {
    'Arco del año': ['Tema Toño', 'Arco Miguel', 'Belle Delphine Fake'],
    'CCR': ['Aimep3', 'Horcus', 'Temach', 'Any Cemar'],
    'Cancion del año': ['El futbol o el free fire', 'Taca La Petaca (CapuNieto)', 'Los Macías-Plebitos', 'Mateo Yo Guapo'],
    'Clip del año': ['Toño Sova', 'Miguel ciega a Leo', 'Ñorcus Chavarin'],
    'Papoi del año': ['Omar', 'Santiago', 'Diego', 'Chavarin', 'Miguel', 'Toño', 'Joshua', 'Corona'],
    'Menos activo del año': ['Miguel', 'Diego', 'Santiago'],
    'Naco del año': ['Leo', 'Chavarin', 'Toño'],
    'Payaso del año': ['Omar', 'Chavarin', 'Leo', 'Toño'],
    'Tilteo del año': ['Leo-Toño', 'Corona-Toño', 'Chava-Toño']
  };

  useEffect(() => {
    if (!user) return;

    const checkUserVotes = async () => {
      try {
        const userVotesRef = doc(db, 'Votaciones', user.uid);
        const userVotesDoc = await getDoc(userVotesRef);
        
        if (userVotesDoc.exists()) {
          setHasVoted(true);
          setVotes(userVotesDoc.data() as Record<string, string>);
        }
      } catch (error) {
        setError('Error al cargar los votos del usuario');
        console.error('Error checking user votes:', error);
      }
    };

    checkUserVotes();

    // Escuchar cambios en los resultados
    const unsubscribes = Object.keys(categories).map(category => {
      return onSnapshot(doc(db, 'Votaciones', category), (doc) => {
        if (doc.exists()) {
          setResults(prev => ({
            ...prev,
            [category]: doc.data()
          }));
        }
      });
    });

    return () => {
      unsubscribes.forEach(unsubscribe => unsubscribe());
    };
  }, [user]);

  const handleVote = (categoryId: string, option: string) => {
    if (hasVoted || !user) return;
    setError(null);
    
    setVotes(prev => ({
      ...prev,
      [categoryId]: option
    }));
  };

  const submitVotes = async () => {
    if (hasVoted || !user || Object.keys(votes).length === 0) return;
    setError(null);

    console.log('Votes to submit:', votes); // Depuración

    try {
      // Primero guardamos los votos del usuario
      await setDoc(doc(db, 'Votaciones', user.uid), votes);

      // Actualizamos los contadores de cada categoría
      const updatePromises = Object.entries(votes).map(async ([categoryId, option]) => {
        try {
          // Obtener el documento actual de la categoría
          const categoryRef = doc(db, 'Votaciones', categoryId);
          const categoryDoc = await getDoc(categoryRef);

          console.log(`Updating category ${categoryId} with option ${option}`); // Depuración

          // Si el documento existe, actualizamos el contador correspondiente
          if (categoryDoc.exists()) {
            const currentData = categoryDoc.data();
            await updateDoc(categoryRef, {
              [option]: (currentData[option] || 0) + 1
            });
            console.log(`Successfully updated category ${categoryId}`); // Depuración
          } else {
            // Si el documento no existe, lo creamos con valores iniciales
            const initialData = categories[categoryId].reduce((acc: Record<string, number>, opt) => {
              acc[opt] = 0;
              return acc;
            }, {} as Record<string, number>);
            await setDoc(categoryRef, initialData);
            console.log(`Created new document for category ${categoryId}`); // Depuración
            // Luego actualizamos el contador correspondiente
            await updateDoc(categoryRef, {
              [option]: 1
            });
            console.log(`Successfully updated category ${categoryId}`); // Depuración
          }
        } catch (error) {
          console.error(`Error updating category ${categoryId}:`, error);
          throw error; // Propagar el error para manejo general
        }
      });

      // Esperar a que todas las actualizaciones se completen
      await Promise.all(updatePromises);

      setHasVoted(true);
    } catch (error) {
      setError('Error al enviar los votos. Por favor, intenta de nuevo.');
      console.error('Error submitting votes:', error);
    }
  };

  return {
    votes,
    hasVoted,
    results,
    error,
    handleVote,
    submitVotes,
    categories // Exportar las categorías para usarlas en la interfaz de usuario
  };
};

export default useVoting;