import path from 'path';
import low from 'lowdb';
import lodash from 'lodash';
import express from 'express';

const router = express.Router();

export default function exampleRoutes(options) {
  const { storage } = options;
  const db = low(path.resolve(__dirname, 'examples.json'), { storage });

  router.get('/api/examples/:id', function(req, res) {
    const user = db.get('examples').find({ id: req.params.id }).value();
    return user ? res.send(user) : res.status(404).send({ message: "Not found" });
  });

  router.get('/api/examples', function(req, res) {
    let id = lodash.trim(req.query.id);
    let name = lodash.trim(req.query.name);
    let q = req.query.q;

    let filter = function(example) {
      if (q) {
        let id = lodash.toLower(example.id);
        let name = lodash.toLower(example.name);
        if (lodash.startsWith(id, lodash.toLower(q)) ||
          lodash.startsWith(name, lodash.toLower(q))) {
          return true
        } else {
          return false
        }
      } else {
        if (id) {
          if (!lodash.startsWith(lodash.toLower(example.id), lodash.toLower(id))) {
            return false;
          }
        }
        if (name) {
          if (!lodash.startsWith(lodash.toLower(example.name), lodash.toLower(name))) {
            return false
          }
        }
      }
      return true;
    };

    let result = db.get('examples').chain().filter(filter);

    let sort = req.query.sort;
    let order = req.query.order;
    let max = parseInt(req.query.max, 10) || 10;
    let offset = parseInt(req.query.offset, 10) || 0;

    let total = result.size().value();
    if (sort) {
      result = result.orderBy(sort, order);
    }
    if (offset) {
      result = result.slice(offset);
    }
    if (max) {
      result = result.take(max);
    }
    let items = result.value();

    res.setHeader('Content-Range', `items ${offset}-${offset + max - 1}/${total}`);
    res.send(items)
  });

  return router;
}
