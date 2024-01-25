// Importa a configuração do Firebase Firestore
const db = require('../firebaseConfig');

// Define o controlador para as operações de saída
const saidaController = {
    // Método para criar uma nova saída
    createSaida: async (req, res) => {
        try {
            // Cria uma nova referência de documento na coleção 'saidas' com um ID único
            const saidaRef = db.collection('saidas').doc();
            // Define o documento com os dados fornecidos na requisição
            await saidaRef.set(req.body);
            // Retorna uma resposta de sucesso com o ID do documento e os dados fornecidos
            res.status(201).json({ id: saidaRef.id, ...req.body });
        } catch (error) {
            // Em caso de erro, retorna uma resposta de erro interno do servidor
            res.status(500).send(error.message);
        }
    },

    // Método para obter todas as saídas registradas
    getAllSaidas: async (req, res) => {
        try {
            // Obtém todos os documentos da coleção 'saidas'
            const saidasSnapshot = await db.collection('saidas').get();
            const saidas = [];
            // Itera sobre cada documento, adicionando-os a um array de saídas
            saidasSnapshot.forEach(doc => {
                saidas.push({ id: doc.id, ...doc.data() });
            });
            // Retorna uma resposta de sucesso com o array de saídas
            res.status(200).json(saidas);
        } catch (error) {
            // Em caso de erro, retorna uma resposta de erro interno do servidor
            res.status(500).send(error.message);
        }
    },

    // Método para obter uma saída específica pelo ID
    getSaidaById: async (req, res) => {
        try {
            // Cria uma referência para o documento na coleção 'saidas' com o ID especificado
            const saidaRef = db.collection('saidas').doc(req.params.id);
            // Tenta obter o documento
            const doc = await saidaRef.get();
            // Verifica se o documento existe
            if (!doc.exists) {
                // Se não existir, retorna uma resposta de não encontrado
                res.status(404).send('saida não encontrada');
            } else {
                // Se existir, retorna uma resposta de sucesso com os dados do documento
                res.status(200).json({ id: doc.id, ...doc.data() });
            }
        } catch (error) {
            // Em caso de erro, retorna uma resposta de erro interno do servidor
            res.status(500).send(error.message);
        }
    },

    // Método para atualizar os dados de uma saída específica pelo ID
    updateSaida: async (req, res) => {
        try {
            // Cria uma referência para o documento na coleção 'saidas' com o ID especificado
            const saidaRef = db.collection('saidas').doc(req.params.id);
            // Atualiza o documento com os dados fornecidos na requisição
            await saidaRef.update(req.body);
            // Retorna uma resposta de sucesso indicando que a saída foi atualizada
            res.status(200).send('saida atualizada com sucesso');
        } catch (error) {
            // Em caso de erro, retorna uma resposta de erro interno do servidor
            res.status(500).send(error.message);
        }
    },

    // Método para deletar uma saída específica pelo ID
    deleteSaida: async (req, res) => {
        try {
            // Cria uma referência para o documento na coleção 'saidas' com o ID especificado
            const saidaRef = db.collection('saidas').doc(req.params.id);
            // Deleta o documento
            await saidaRef.delete();
            // Retorna uma resposta de sucesso indicando que a saída foi deletada
            res.status(200).send('saida deletada com sucesso');
        } catch (error) {
            // Em caso de erro, retorna uma resposta de erro interno do servidor
            res.status(500).send(error.message);
        }
    }
};

// Exporta o controlador para que possa ser utilizado em outras partes da aplicação
module.exports = saidaController;
