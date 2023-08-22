import express = require('express');
import controller from '../controllers/controller';
const router = express.Router();

router.get('/lottatore', controller.getLottatori);
router.get('/lottatore/complete', controller.getFiltedLottatori);
router.get('/lottatore/aggiungi/:nome/:cognome/:cf/:nascita/:peso/:team/:disciplina', controller.putLottatore);
router.get('/lottatore/rimuovi/:cf', controller.deleteLottatore);
router.get('/categoria', controller.getCategorie);
router.get('/disciplina', controller.getDiscipline);
router.get('/team', controller.getTeams);
router.get('/team/aggiungi/:TeamName/:CeoName/:Countrie', controller.putTeam);
router.get('/team/rimuovi/:id', controller.deleteTeam);
router.get('/sponsor', controller.getSponsor);
router.get('/sponsor/aggiungi/:nome/:pagamento', controller.putSponsor);
router.get('/sponsor/rimuovi/:id', controller.deleteSponsor);
router.get('/evento/aggiungi/:evento/:scontroI/:scontroII', controller.putEventoIIScontri);
router.get('/evento/aggiungi/:evento/:scontroI/:scontroII/:scontroIII', controller.putEventoIIIScontri);
router.get('/evento/aggiungi/:evento/:scontroI/:scontroII/:scontroIII/:scontroIV', controller.putEventoIVScontri);
router.get('/evento/aggiungi/:evento/:scontroI/:scontroII/:scontroIII/:scontroVI/:scontroV', controller.putEventoVScontri);

export = router;