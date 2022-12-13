import { Router } from 'express';
import { body } from 'express-validator';
import { createProduct, deleteProduct, getOneProduct, getProducts, updateProduct } from './handlers/product';
import { createUpdate, deleteUpdate, getOneUpdate, getUpdates, updateUpdate } from './handlers/update';
import { handleInputsErrors } from './modules/middlewares';

const router = Router();

/**
 * Product
 */

router.get('/product', getProducts);
router.get('/product/:id', getOneProduct);
router.put('/product/:id', body('name').isString(), handleInputsErrors, updateProduct);
router.post('/product', body('name').isString(), handleInputsErrors, createProduct);
router.delete('/product/:id', deleteProduct);

/**
 * Update
 */

router.get('/update', getUpdates);
router.get('/update/:id', getOneUpdate);
router.put('/update/:id',
  body('title').optional(),
  body('body').optional(),
  body('status').optional().isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']),
  body('version').optional(),
  handleInputsErrors, updateUpdate);
router.post('/update',
  body('title').exists().isString(),
  body('body').exists().isString(),
  body('productId').exists().isString(),
  handleInputsErrors, createUpdate);
router.delete('/update/:id', deleteUpdate);

/**
* Update Point
*/

router.get('/updatepoint', () => { });
router.get('/updatepoint/:id', () => { });
router.put('/updatepoint/:id',
  body('name').optional().isString(),
  body('description').optional().isString(),
  handleInputsErrors, (req, res) => {

  });
router.post('/updatepoint',
  body('name').isString(),
  body('description').isString(),
  body('updateId').isString(),
  handleInputsErrors, (req, res) => {

  });
router.delete('/updatepoint/:id', () => { });


router.use((err, req, res, next) => {
  if (err.type === 'auth') {
    res.status(401).json({ message: 'Unauthorized' });
  } else if (err.type === 'input') {
    res.status(400).json({ message: 'Invalid Input' });
  } else {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default router;