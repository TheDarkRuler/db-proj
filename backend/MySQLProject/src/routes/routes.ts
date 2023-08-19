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
router.get('/evento/aggiungi/:stadio/:luogo/:rent/:satff/:start/:end/:date\
            /:firstSpo/:secondSpo/:thirdSpo/:standNum/:standPrice/:premNum/:premPrice', controller.putEvento2Scontri);
router.get('/evento/aggiungi/:stadio/:luogo/:rent/:satff/:start/:end/:date\
            /:firstSpo/:secondSpo/:thirdSpo/:standNum/:standPrice/:premNum/:premPrice', controller.putEvento3Scontri);
router.get('/evento/aggiungi/:stadio/:luogo/:rent/:satff/:start/:end/:date\
            /:firstSpo/:secondSpo/:thirdSpo/:standNum/:standPrice/:premNum/:premPrice', controller.putEvento4Scontri);
router.get('/evento/aggiungi/:stadio/:luogo/:rent/:satff/:start/:end/:date\
            /:firstSpo/:secondSpo/:thirdSpo/:standNum/:standPrice/:premNum/:premPrice', controller.putEvento5Scontri);

export = router;