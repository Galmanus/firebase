// Importa o módulo de configuração do Firebase, para conectar-se ao banco de dados Firebase.
const db = require('../firebaseConfig');

// Define um objeto EntradaController que contém métodos para manipular "entradas" no banco de dados.
const EntradaController = {
    // Método assíncrono para criar uma nova "entrada".
    createEntrada: async (req, res) => {
        try {
            // Busca um documento específico na coleção 'produtos' usando o ID passado nos parâmetros da requisição.
            const produtoSnapshot = db.collection('produtos').doc(req.params.id);
            // Aguarda a obtenção do documento.
            doc = await produtoSnapshot.get();

            // Cria uma referência para um novo documento na coleção 'entradas' sem especificar um ID, permitindo que o Firebase gere um automaticamente.
            const entradaRef = db.collection('entradas').doc();
            // Define o documento na coleção 'entradas' com os dados enviados no corpo da requisição.
            await entradaRef.set(req.body);

            // Verifica se o documento do produto existe. Se não, responde com status 400 e uma mensagem de erro.
            if (!doc.exists) {
                res.status(400).json({ message: 'Produto inválido' });
            }else{
                // Se o documento existir, responde com status 201 e os dados da nova "entrada" criada.
                res.status(201).json({ id: entradaRef.id, ...req.body });
            }
               
        } catch (error) {
            // Captura qualquer erro durante o processo e responde com status 500 e a mensagem de erro.
            res.status(500).send(error.message);
        }
    },

    // Método assíncrono para obter todas as "entradas" da coleção.
    getAllEntradas: async (req, res) => {
        try {
            // Obtém todos os documentos da coleção 'entradas'.
            const EntradasSnapshot = await db.collection('entradas').get();
            const Entradas = [];
            // Itera sobre cada documento, adicionando-o à lista Entradas com seu ID e dados.
            EntradasSnapshot.forEach(doc => {
                Entradas.push({ id: doc.id, ...doc.data() });
            });
            // Responde com status 200 e a lista de todas as "entradas".
            res.status(200).json(Entradas);
        } catch (error) {
            // Em caso de erro, responde com status 500 e a mensagem de erro.
            res.status(500).send(error.message);
        }
    },

    // Método assíncrono para obter uma "entrada" específica pelo ID.
    getEntradaById: async (req, res) => {
        try {
            // Cria uma referência para o documento específico na coleção 'entradas' usando o ID da requisição.
            const entradaRef = db.collection('entradas').doc(req.params.id);
            // Obtém o documento.
            const doc = await entradaRef.get();
            // Verifica se o documento existe. Se não existir, responde com status 404.
            if (!doc.exists) {
                res.status(404).send('entrada não encontrado');
            } else {
                // Se o documento existir, responde com status 200 e os dados da "entrada".
                res.status(200).json({ id: doc.id, ...doc.data() });
            }
        } catch (error) {
            // Em caso de erro, responde com status 500 e a mensagem de erro.
            res.status(500).send(error.message);
        }
    },

    // Método assíncrono para atualizar uma "entrada" específica pelo ID.
    updateEntrada: async (req, res) => {
        try {
            // Cria uma referência para o documento específico na coleção 'entradas' usando o ID da requisição.
            const entradaRef = db.collection('entradas').doc(req.params.id);
            // Atualiza o documento com os dados enviados no corpo da requisição.
            await entradaRef.update(req.body);
            // Responde com status 200 e uma mensagem de sucesso.
            res.status(200).send('entrada atualizado com sucesso');
        } catch (error) {
            // Em caso de erro, responde com status 500 e a mensagem de erro.
            res.status(500).send(error.message);
        }
    },

    // Método assíncrono para deletar uma "entrada" específica pelo ID.
    deleteEntrada: async (req, res) => {
        try {
            // Cria uma referência para o documento específico na coleção 'entradas' usando o ID da requisição.
            const entradaRef = db.collection('entradas').doc(req.params.id);
            // Deleta o documento.
            await entradaRef.delete();
            // Responde com status 200 e uma mensagem de sucesso.
            res.status(200).send('entrada deletado com sucesso');
        } catch (error) {
            // Em caso de erro, responde com status 500 e a mensagem de erro.
            res.status(500).send(error.message);
        }
    }
};

// Exporta o objeto EntradaController para que possa ser usado em outras partes do aplicativo.
module.exports = EntradaController;
