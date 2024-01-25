const db = require('../firebaseConfig');

const EntradaController = {
    createEntrada: async (req, res) => {
        try {
            const produtoSnapshot = db.collection('produtos').doc(req.params.id);
            doc = await produtoSnapshot.get();

            const entradaRef = db.collection('entradas').doc();
            await entradaRef.set(req.body);

            if (!doc.exists) {
                res.status(400).json({ message: 'Produto inválido' });
            }else{
                res.status(201).json({ id: entradaRef.id, ...req.body });
            }
               
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    getAllEntradas: async (req, res) => {
        try {
            const EntradasSnapshot = await db.collection('entradas').get();
            const Entradas = [];
            EntradasSnapshot.forEach(doc => {
                Entradas.push({ id: doc.id, ...doc.data() });
            });
            res.status(200).json(Entradas);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    getEntradaById: async (req, res) => {
        try {
            const entradaRef = db.collection('entradas').doc(req.params.id);
            const doc = await entradaRef.get();
            if (!doc.exists) {
                res.status(404).send('entrada não encontrado');
            } else {
                res.status(200).json({ id: doc.id, ...doc.data() });
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    updateEntrada: async (req, res) => {
        try {
            const entradaRef = db.collection('entradas').doc(req.params.id);
            await entradaRef.update(req.body);
            res.status(200).send('entrada atualizado com sucesso');
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    deleteEntrada: async (req, res) => {
        try {
            const entradaRef = db.collection('entradas').doc(req.params.id);
            await entradaRef.delete();
            res.status(200).send('entrada deletado com sucesso');
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
};

module.exports = EntradaController;