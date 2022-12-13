import prisma from "../db";

// Get all updates
export const getUpdates = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    }
  });

  const updates = products.reduce((allUpdates, product) => {
    return [...allUpdates, ...product.updates];
  }, [])

  res.json({ data: updates });

}

// Get a single update
export const getOneUpdate = async (req, res) => {
  const update = await prisma.update.findUnique({
    where: {
      id: req.params.id,
    }
  });

  res.json({ data: update });
}

// Create an update
export const createUpdate = async (req, res) => {
  const product = await prisma.product.findUnique({
    where: {
      id: req.body.productId,
    }
  })

  if (!product) {
    return res.status(400).json({ message: 'Product not found' });
  }

  const update = await prisma.update.create({
    data: {
      title: req.body.title,
      body: req.body.body,
      product: {
        connect: { id: product.id }
      }
    }
  });

  res.json({ data: update });
}
// Update an update
export const updateUpdate = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      updates: true
    }
  })

  const updates = products.reduce((allUpdates, product) => {
    return [...allUpdates, ...product.updates];
  }, [])

  const match = updates.find(update => update.id === req.params.id);

  if (!match) {
    return res.status(400).json({ message: 'Update not found' });
  }

  const updatedUpdate = await prisma.update.update({
    where: {
      id: req.params.id,
    },
    data: req.body
  });

  res.json({ data: updatedUpdate });
}

// Delete an update
export const deleteUpdate = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      updates: true
    }
  })

  const updates = products.reduce((allUpdates, product) => {
    return [...allUpdates, ...product.updates];
  }, [])

  const match = updates.find(update => update.id === req.params.id);

  if (!match) {
    return res.status(400).json({ message: 'Update not found' });
  }

  const deletedUpdate = await prisma.update.delete({
    where: {
      id: req.params.id,
    }
  })

  res.json({ data: deletedUpdate })
}