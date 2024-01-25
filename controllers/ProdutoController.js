// Importa a configuração do Firebase
const db = require('../firebaseConfig');

// Define o controlador de produtos
const ProdutoController = {
    // Função assíncrona para criar um produto
    createProduto: async (req, res) => {
        // Verifica se o documento do produto já existe (linha parece estar desatualizada ou incorreta, pois produtoDoc não é definido previamente)
        try {
            // Cria uma referência para um novo documento na coleção 'produtos'
            const produtoRef = db.collection('produtos').doc();
            // Define o documento com os dados enviados na requisição
            await produtoRef.set(req.body);
            // Retorna o produto criado com status 201
            res.status(201).json({ id: produtoRef.id, ...req.body });
        } catch (error) {
            // Em caso de erro, retorna status 500 com a mensagem do erro
            res.status(500).send(error.message);
        }
    },

    // Função assíncrona para obter todos os produtos
    getAllProdutos: async (req, res) => {
        try {
            // Obtém todos os documentos da coleção 'produtos'
            const produtosSnapshot = await db.collection('produtos').get();
            const produtos = [];
            // Itera sobre cada documento, adicionando-os a uma lista de produtos
            produtosSnapshot.forEach(doc => {
                produtos.push({ id: doc.id, ...doc.data() });
            });
            // Retorna a lista de produtos com status 200
            res.status(200).json(produtos);
        } catch (error) {
            // Em caso de erro, retorna status 500 com a mensagem do erro
            res.status(500).send(error.message);
        }
    },

    // Função assíncrona para obter um produto pelo ID
    getProdutoById: async (req, res) => {
        try {
            // Cria uma referência para o documento do produto com o ID especificado
            const produtoRef = db.collection('produtos').doc(req.params.id);
            // Tenta obter o documento
            const doc = await produtoRef.get();
            // Verifica se o documento existe
            if (!doc.exists) {
                // Se não existir, retorna erro 404
                res.status(404).send('Produto não encontrado');
            } else {
                // Se existir, retorna o produto com status 200
                res.status(200).json({ id: doc.id, ...doc.data() });
            }
        } catch (error) {
            // Em caso de erro, retorna status 500 com a mensagem do erro
            res.status(500).send(error.message);
        }
    },

    // Função assíncrona para atualizar um produto pelo ID
    updateProduto: async (req, res) => {
        try {
            // Cria uma referência para o documento do produto com o ID especificado
            const produtoRef = db.collection('produtos').doc(req.params.id);
            // Atualiza o documento com os dados enviados na requisição
            await produtoRef.update(req.body);
            // Retorna uma mensagem de sucesso com status 200
            res.status(200).send('Produto atualizado com sucesso');
        } catch (error) {
            // Em caso de erro, retorna status 500 com a mensagem do erro
            res.status(500).send(error.message);
        }
    },

    // Função assíncrona para deletar um produto pelo ID
    deleteProduto: async (req, res) => {
        try {
            // Cria uma referência para o documento do produto com o ID especificado
            const produtoRef = db.collection('produtos').doc(req.params.id);
            // Deleta o documento
            await produtoRef.delete();
            // Retorna uma mensagem de sucesso com status 200
            res.status(200).send('Produto deletado com sucesso');
        } catch (error) {
            // Em caso de erro, retorna status 500 com a mensagem do erro
            res.status(500).send(error.message);
        }
    }
};

// Exporta o controlador de produtos para ser usado em outras partes da aplicação
module.exports = ProdutoController;
