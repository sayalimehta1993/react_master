import Parse from 'parse';

export const getRecords = ({ keyword, page, max, setState }) => {
  const query = new Parse.Query('Test');
  query.descending('createdAt');
  if (keyword) {
    query.matches('title', keyword, 'i');
  }

  // page 0 (reality),  records 0, 1: page 0, starting 0, max is 2
  // page 1 (reality), records 2, 3: page 1, starting 2, max is 2
  // page 2 (reality), records 4, 5: page is 2, starting is 4, max is 2
  // page 3 (reality), records 6, 7: page is 3, starting is 6, max is 2

  query.skip(page * max);
  query.limit(max);

  query.withCount();
  query
    .find()
    .then((data) => {
      setState((st) => {
        return { ...st, ...data };
      });
    })
    .catch((err) => {
      console.log('err is ', err);
    });
};

const create_record = (obj, setState) => {
  setState((st) => {
    return { ...st, count: st.count + 1, results: [obj, ...st.results] };
  });
};
const update_record = (obj, setState) => {
  setState((st) => {
    const res = [...st.results];
    const index = res.findIndex((rec) => {
      return obj.id === rec.id;
    });
    // update only when we find index != -1
    if (index !== -1) {
      res.splice(index, 1, obj);
    }
    return { ...st, results: res };
  });
};
const delete_record = (obj, setState) => {
  setState((st) => {
    const res = [...st.results];
    const index = res.findIndex((rec) => {
      return obj.id === rec.id;
    });
    // update only when we find index != -1
    if (index !== -1) {
      res.splice(index, 1);
    }
    return { ...st, results: res, count: st.count - 1 };
  });
};

export const getRecordsLiveQuery = async ({ subscription, setState }) => {
  const query = new Parse.Query('Test');
  if (subscription && subscription.current) {
    await subscription.current.unsubscribe();
  }
  subscription.current = await query.subscribe();

  subscription.current.on('open', () => {
    console.log('subscription opened'); // this is only for information purpose that subscription is opened.
  });
  subscription.current.on('create', (object) => {
    console.log('object created', object);
    create_record(object, setState);
  });
  subscription.current.on('update', (object) => {
    console.log('object updated', object);
    update_record(object, setState);
  });
  subscription.current.on('enter', (object) => {
    console.log('object entered', object);
    create_record(object, setState);
  });
  subscription.current.on('leave', (object) => {
    console.log('object left', object);
    delete_record(object, setState);
  });
  subscription.current.on('delete', (object) => {
    console.log('object deleted', object);
    delete_record(object, setState);
  });
  subscription.current.on('close', () => {
    console.log('subscription closed');
  });
};