# CRUDS Product Management System

A small, dependency-free product and sales tracker that runs in a web browser. It
uses browser `localStorage` for persistence; there is no server or build step.

## Run the project

Open `maged2_copy.html` directly in a modern browser. Keep the HTML, CSS, and
JavaScript files in the same folder so the relative asset paths continue to
work.

The application stores data in the browser profile for the page's origin. If you
open the page as a local file, storage is associated with that browser's local
file origin. Clearing browser site data, using another browser/profile, or
changing the origin can make the saved data unavailable.

## Files

| File | Purpose |
| --- | --- |
| `maged2_copy.html` | Page structure, product-entry controls, tables, and inline event handlers. Loads the stylesheet and application script. |
| `css maged_copy.css` | Page colors, input and button styling, table layout, and the `.btn4` hide/show utility class. |
| `cruds_copy.JS` | Product CRUD operations, search, sold-item tracking, day summaries, and `localStorage` persistence. |

The JavaScript is loaded as a classic script at the end of the page. The HTML
uses inline `onclick`, `onkeyup`, and `onblur` handlers, so the functions they
call must remain global. The code is kept in one script to preserve that
existing wiring.

## Product management

### Create products

1. Enter a title, price, taxes, advertising cost, discount, and category.
2. The total is calculated as:

   ```text
   price + taxes + ads - discount
   ```

3. Enter a count from 1 to 100 and select **create**.

Creating a count greater than one adds that many separate, identical product
records. The count field is not a stock quantity that is decremented later:
each created record has its own row and retains the entered count value.
Creation is skipped when the count is greater than 100; the app does not show
an error message for that case.

### Read and total

The main table lists active records with their title, price, taxes, ads,
discount, calculated total, and category. The total below the table is the sum
of each active record's stored total.

### Update

Select **update** on a row to load its values into the entry fields. Change the
values and select **update** again to save. The count input is hidden while
editing because an update changes one record rather than creating copies.

### Sell a product

Select **sell** to remove a product from the active table and add a copy of its
details to the sold-items list. Sold items are stored separately and contribute
to the day summary.

### Delete all active products

Select **delete all**, then **sure** to remove every active product. This only
clears the active-product data; it does not clear sold items or saved day
summaries. The action cannot be undone from the page.

## Search

Choose **search by title** or **search by category**, then type in the search
field. Matching is a case-sensitive substring search. An empty query matches
all active products. Search results use the same row actions as the main table.

## Days and history

The **new day** control switches to the sold-items/day view. That view lists
products previously marked **sell** and shows the sum of their stored totals.
**Back** on a sold row returns it to the active products as one record and
removes it from the sold-items list.

Select **finish and get new day** to:

1. Save a summary of the sold items' total price, total discount, and total
   calculated gain.
2. Clear the sold-items list.
3. Leave active products unchanged.

The previous-days table can be hidden or shown with **hide** and **view**. A
history entry contains totals only; it does not include a date or product-level
details. The page does not automatically start a dated day or rotate records at
midnight.

## Browser storage

The script reads and writes three `localStorage` keys. Their values are JSON
arrays:

| Key | Contents |
| --- | --- |
| `item` | Active product records: `title`, `price`, `taxes`, `ads`, `discount`, `total`, `count`, and `category`. |
| `name` | Sold-item records, using the corresponding properties with an `_n` suffix, such as `title_n` and `total_n`. |
| `history` | Day summaries with `price_history`, `discount_history`, and `total_history`. |

Values entered in number fields are generally stored as strings; arithmetic
converts them to numbers when totals are calculated. Storage is not validated
against a schema, synchronized between devices, or backed up by the app.

## Current limitations

- The page has no form validation or user-facing error messages for invalid
  counts or malformed saved data.
- Search is case-sensitive and only searches active products.
- Day summaries do not record a date, and finishing a day does not clear active
  products.
- Reopening the sold-items/day view before finishing a day adds the same sold
  item totals again, which can inflate the displayed and saved summary.
- Product values are inserted into table HTML directly. Use only trusted input;
  this app is not designed to safely display untrusted data.
- The search-mode buttons have `onblur="create()"` handlers in the current HTML.
  Moving focus away from those buttons can invoke product creation or an update.
- Data is local to the browser and can be lost when its site data is cleared.
