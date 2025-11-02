Step 1:

Create items: (**Completed**)

1. Create empty files and named controllers/itemsControllers and route/items.js **ok**
2. Create the functions for the CRUD of items en itemsControllers.
   a. create items and test **ok**
   b. List items and test **ok**
   c. Update items and test **ok**
   d. Delete items and test **ok**
3. Create the endpoints in items.js. check how to include authorization for create items, only admin create items. **ok**
4. Test functions for each items created. **ok**

Create Stations: **ok**

1. Create Files:
   a. controllers/stationItemsController.js
   b. routes/stationsItems.js
2. Create CRUD for stations:
   a. Item assignment in station and test
   b. List item assigned for stations and test
   c. Update item assigned in the base station and test
   d. Delete item assigned in a station and test

   \*\* Valide Test in postman and jest.

create locations **ok**

Step 2: (**Completed**)

Create StationItemsController: This include the configuration of each items in each stations:
e.g.
_Station_: Fryer
_Items list_:

- Chicken Wings
- Fish
- Chicken tenders

_Station_: Sandwich
_Item List_:

- Bread
- Tomatoes
- Romaine
- Iceberg

Step 3: (**in process**)

Checklists diarios:

1.  checklists
    Create a static list with all items incluided in the stations selected.
2.  checklist_items
    Create a status verified or pending for each item, this step avoid t change the status for items and finish checklist.

    **Add only one checklist active for station. Actually the checklist for stations is unlimited(error).**
    Revisar que los checklist a verificar para el frontend pueda traer toda la informacion del item, de la base.

step 4:

Desplegar el backend en Render o Railway

Desplegar el frontend Next.js en Vercel

Configurar las variables de entorno en Vercel (API_URL, etc.)

Permitir CORS entre ambos
