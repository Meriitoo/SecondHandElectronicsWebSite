const router = require('express').Router();
const { isAuth } = require('../middlewares/authMiddleware');
const electronicsService = require('../services/electronicsService');
const { getErrorMessage } = require('../utils/errorUtils');



router.get('/catalog', async (req, res) => {
   const electronics = await electronicsService.getAll();

   res.render('electronics/catalog', { electronics });

});


router.get('/create', isAuth, (req, res) => {
    res.render('electronics/create');
 });

 router.post('/create', isAuth, async (req, res) => {
    const electronicsData = req.body;

    try {
      await electronicsService.create(req.user._id, electronicsData);
      res.redirect('/electronics/catalog');

    } catch (error) {
      return res.status(400).render('electronics/create', { ...electronicsData, error: getErrorMessage(error), electronicsData: electronicsData });
    }
 });


router.get('/:electronicsId/details', async (req, res) => {
   const electronics = await electronicsService.getOne(req.params.electronicsId);

   const isOwner = electronics.owner == req.user?._id;

   const isBuyer = electronics.buyingList?.some(id => id == req.user?._id);

   res.render('electronics/details', { ...electronics, isOwner, isBuyer });
});

router.get('/:electronicsId/buy', isAuth, async (req, res) => {
   try{
      await electronicsService.buy(req.user._id, req.params.electronicsId);
   }catch(error){
      return res.status(400).render('404', {error: getErrorMessage(error)});
   }
  
   res.redirect(`/electronics/${req.params.electronicsId}/details`);
});

router.get('/:electronicsId/edit', isAuth, async (req, res) => {
   const electronics = await electronicsService.getOne(req.params.electronicsId);

   res.render('electronics/edit', { ...electronics });
});


router.post('/:electronicsId/edit', isAuth, async (req, res) => {
   const electronicsData = req.body;
   try {
      await electronicsService.edit(req.params.electronicsId, electronicsData); 
   
      res.redirect(`/electronics/${req.params.electronicsId}/details`);
  } catch (error) {

      return res.render('electronics/edit', { ...electronicsData, error: getErrorMessage(error)});
  };
});

router.get('/:electronicsId/delete', isAuth,  async (req, res) => {

   await electronicsService.delete(req.params.electronicsId);
   res.redirect('/electronics/catalog')
});


router.get('/search', async (req, res) => {

   const { name, type } = req.query; //query is get request

   const electronics = await electronicsService.search(name, type);

   res.render('electronics/search', { electronics, name, type });
});




module.exports = router;