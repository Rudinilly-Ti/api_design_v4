import prisma from "../db";

// Get all products
export const getProducts = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
    include: {
      products: true,
    },
  });

  res.json({ data: user.products });
}

// Get a single product
export const getOneProduct = async (req, res) => {
  const id = req.params.id;

  const product = await prisma.product.findFirst({
    where: {
      id,
      belongsToId: req.user.id,
    },
  });

  res.json({ data: product });
}

// Create a product
export const createProduct = async (req, res, next) => {
  const { name } = req.body;
  try {

    const product = await prisma.product.create({
      data: {
        name,
        belongsToId: req.user.id,
      },
    });

    res.json({ data: product });
  } catch (err) {
    next(err)
  }
}

// Update a product
export const updateProduct = async (req, res) => {
  const { name } = req.body;
  const id = req.params.id;

  const product = await prisma.product.update({
    where: {
      id_belongsToId: {
        id,
        belongsToId: req.user.id,
      },
    },
    data: {
      name,
    },
  });

  res.json({ data: product });
}

// Delete a product
export const deleteProduct = async (req, res) => {
  const id = req.params.id;

  const deleted = await prisma.product.delete({
    where: {
      id_belongsToId: {
        id,
        belongsToId: req.user.id,
      }
    },
  });

  res.json({ data: deleted });
}
