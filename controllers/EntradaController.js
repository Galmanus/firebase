// Importa a configuração do Firebase
const db = require('../firebaseConfig');

// Define o controlador de entradas de produtos
const EntradaController = {
    // Função assíncrona para criar uma nova entrada de produto
    createEntrada: async (req, res) => {
        try {
            // Extrai o ID do produto do corpo da requisição
            const produtoId = req.body.produtoId;
            // Cria uma referência para o documento do produto no estoque usando o ID do produto
            const produtoRef = db.collection('estoque').doc(produtoId);
            // Obtém o documento do produto
            const produtoDoc = await produtoRef.get();

            // Verifica se o documento do produto existe
            if (!produtoDoc.exists) {
                // Se não existir, retorna erro 404 indicando que o produto não foi encontrado no estoque
                return res.status(404).send('Produto não encontrado no estoque');
            }

            // Cria uma referência para um novo documento na coleção 'entradas'
            const entradaRef = db.collection('entradas').doc();
            // Define o novo documento com os dados da requisição
            await entradaRef.set(req.body);
            // Retorna os dados da entrada criada com status 201
            res.status(201).json({ id: entradaRef.id, ...req.body });
        } catch (error) {
            // Em caso de erro, retorna status 500 com a mensagem do erro
            res.status(500).send(error.message);
        }
    },

    // Função assíncrona para obter todas as entradas de produtos
    getAllEntradas: async (req, res) => {
        try {
            // Obtém todos os documentos da coleção 'entradas'
            const entradasSnapshot = await db.collection('entradas').get();
            const entradas = [];
            // Itera sobre cada documento, adicionando-os a uma lista de entradas
            entradasSnapshot.forEach(doc => {
                entradas.push({ id: doc.id, ...doc.data() });
            });
            // Retorna a lista de entradas com status 200
            res.status(200).json(entradas);
        } catch (error) {
            // Em caso de erro, retorna status 500 com a mensagem do erro
            res.status(500).send(error.message);
        }
    },

    // Função assíncrona para obter uma entrada de produto pelo ID
    getEntradaById: async (req, res) => {
        try {
            // Cria uma referência para o documento da entrada com o ID especificado
            const entradaRef = db.collection('entradas').doc(req.params.id);
            // Tenta obter o documento
            const doc = await entradaRef.get();
            // Verifica se o documento existe
            if (!doc.exists) {
                // Se não existir, retorna erro 404
                res.status(404).send('Entrada não encontrada');
            } else {
                // Se existir, retorna os dados da entrada com status 200
                res.status(200).json({ id: doc.id, ...doc.data() });
            }
        } catch (error) {
            // Em caso de erro, retorna status 500 com a mensagem do erro
            res.status(500).send(error.message);
        }
    },

    // Função assíncrona para atualizar uma entrada de produto pelo ID
    updateEntrada: async (req, res) => {
        try {
            // Cria uma referência para o documento da entrada com o ID especificado
            const entradaRef = db.collection('entradas').doc(req.params.id);
            // Atualiza o documento com os dados enviados na requisição
            await entradaRef.update(req.body);
            // Retorna uma mensagem de sucesso com status 200
            res.status(200).send('Entrada atualizada com sucesso');
        } catch (error) {
            // Em caso de erro, retorna status 500 com a mensagem do erro
            res.status(500).send(error.message);
        }
    },

    // Função assíncrona para deletar uma entrada de produto pelo ID
    deleteEntrada: async (req, res) => {
        try {
            // Cria uma referência para o documento da entrada com o ID especificado
            const entradaRef = db.collection('entradas').doc(req.params.id);
            // Deleta o documento
            await entradaRef.delete();
            // Retorna uma mensagem de sucesso com status 200
            res.status(200).send('Entrada deletada com sucesso');
        } catch (error) {
            // Em caso de erro, retorna status 500 com a mensagem do erro
            res.status(500).send(error.message);
        }
    }
};

// Exporta o controlador de entradas para ser usado em outras partes da aplicação
module.exports = EntradaController;
