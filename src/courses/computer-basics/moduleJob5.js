/**
 * Job Skills 5 — Excel essentials.
 *
 * Deliberately narrow. Microsoft's own Excel certification scope is far
 * broader than an entry-level job needs; this covers only what genuinely
 * comes up: clean list data, a few formulas, readable formatting, sorting
 * and filtering without wrecking the table, and printing.
 *
 * Formulas are taught as *recognition* on the phone ("which formula answers
 * this question?") and as *doing* on a real computer — a spreadsheet
 * simulator would be a lot of engineering for a worse version of the real
 * thing, which is free and already on their machine.
 */

export default {
  id: 'job5',
  emoji: '📊',
  color: 'grass',
  title: { en: 'Excel essentials', es: 'Lo esencial de Excel' },
  subtitle: {
    en: 'Lists, totals, tidy formatting, sorting, and printing',
    es: 'Listas, totales, formato limpio, ordenar, e imprimir',
  },
  lessons: [
    /* ------------------------------------------------------------------ */
    {
      id: 'job5-l1',
      emoji: '🔲',
      minutes: 4,
      title: { en: 'A spreadsheet is a grid', es: 'Una hoja de cálculo es una cuadrícula' },
      steps: [
        {
          type: 'teach',
          title: { en: 'Rows, columns, cells', es: 'Filas, columnas, celdas' },
          body: [
            {
              en: 'A spreadsheet is a grid of boxes. Each box is a __cell__. **Columns** run up and down and are labelled with letters; **rows** run across and are numbered.',
              es: 'Una hoja de cálculo es una cuadrícula de casillas. Cada casilla es una __celda__. Las **columnas** van de arriba abajo y llevan letras; las **filas** van de lado a lado y llevan números.',
            },
            {
              en: 'So every cell has an address made of its column letter and row number. The cell in column B, row 4, is called **B4**. That is the entire naming system.',
              es: 'Así que cada celda tiene una dirección hecha de su letra de columna y número de fila. La celda en la columna B, fila 4, se llama **B4**. Ese es todo el sistema de nombres.',
            },
            {
              en: 'When you hear someone say "put it in C7," they mean: column C, row 7. Click that box and type.',
              es: 'Cuando alguien dice «ponlo en C7», quiere decir: columna C, fila 7. Haz clic en esa casilla y escribe.',
            },
          ],
          callout: {
            en: 'A range like **B2:B10** just means "every cell from B2 down to B10." The colon means "through."',
            es: 'Un rango como **B2:B10** solo significa «cada celda desde B2 hasta B10». Los dos puntos significan «hasta».',
          },
        },
        {
          type: 'choice',
          prompt: {
            en: 'Which cell is in the third column, second row?',
            es: '¿Qué celda está en la tercera columna, segunda fila?',
          },
          options: [
            {
              id: 'a',
              emoji: '📍',
              label: { en: 'C2', es: 'C2' },
              correct: true,
            },
            {
              id: 'b',
              emoji: '🔀',
              label: { en: '2C', es: '2C' },
              why: {
                en: 'Right idea, wrong order — the column letter always comes first: C2.',
                es: 'La idea correcta, orden equivocado — la letra de la columna siempre va primero: C2.',
              },
            },
            {
              id: 'c',
              emoji: '📍',
              label: { en: 'B3', es: 'B3' },
              why: {
                en: 'B is the second column and 3 is the third row — that is the reverse of what was asked.',
                es: 'B es la segunda columna y 3 es la tercera fila — eso es al revés de lo que se pidió.',
              },
            },
          ],
        },
        {
          type: 'recap',
          points: [
            { en: 'Columns have letters, rows have numbers.', es: 'Las columnas tienen letras, las filas números.' },
            { en: 'A cell is named column-then-row: B4.', es: 'Una celda se nombra columna-luego-fila: B4.' },
            { en: 'B2:B10 means every cell from B2 through B10.', es: 'B2:B10 significa cada celda desde B2 hasta B10.' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'job5-l2',
      emoji: '📋',
      minutes: 4,
      title: { en: 'Enter a clean list', es: 'Captura una lista limpia' },
      steps: [
        {
          type: 'teach',
          title: { en: 'One row per thing, one column per fact', es: 'Una fila por cosa, una columna por dato' },
          body: [
            {
              en: 'Almost all everyday spreadsheet work is a **list**. The rule that makes everything else work later: **each row is one item**, and **each column holds one kind of information**.',
              es: 'Casi todo el trabajo diario en hojas de cálculo es una **lista**. La regla que hace que todo lo demás funcione después: **cada fila es una cosa**, y **cada columna guarda un tipo de información**.',
            },
            {
              en: 'So a supply list has one row per item, with columns like Item, Quantity, Price, Vendor. Never two things in one cell, never a column that means different things on different rows.',
              es: 'Así, una lista de insumos tiene una fila por artículo, con columnas como Artículo, Cantidad, Precio, Proveedor. Nunca dos cosas en una celda, nunca una columna que signifique cosas distintas en filas distintas.',
            },
            {
              en: 'The **first row** is your headings — the names of the columns. Excel uses that row to understand your data when you sort or filter later.',
              es: 'La **primera fila** son tus encabezados — los nombres de las columnas. Excel usa esa fila para entender tus datos cuando ordenas o filtras después.',
            },
          ],
          callout: {
            en: 'This one habit is what makes sorting, filtering, and formulas work at all. A messy list fights you at every step afterwards.',
            es: 'Esta sola costumbre es lo que hace que ordenar, filtrar y las fórmulas funcionen. Una lista desordenada te pelea en cada paso después.',
          },
        },
        {
          type: 'choice',
          prompt: {
            en: 'You are listing office supplies. Which is set up correctly?',
            es: 'Estás listando insumos de oficina. ¿Cuál está bien armada?',
          },
          options: [
            {
              id: 'a',
              emoji: '✅',
              label: {
                en: 'Columns: Item | Quantity | Price. One supply per row.',
                es: 'Columnas: Artículo | Cantidad | Precio. Un insumo por fila.',
              },
              correct: true,
            },
            {
              id: 'b',
              emoji: '🥴',
              label: {
                en: 'One column with "20 pens at $1.50 each" written in each cell',
                es: 'Una columna con «20 plumas a $1.50 cada una» escrito en cada celda',
              },
              why: {
                en: 'Everything is jammed into one cell, so Excel cannot total the prices or sort by quantity. Split it into columns.',
                es: 'Todo está apretado en una celda, así que Excel no puede sumar precios ni ordenar por cantidad. Sepáralo en columnas.',
              },
            },
          ],
        },
        {
          type: 'recap',
          points: [
            { en: 'One row per item, one column per kind of information.', es: 'Una fila por cosa, una columna por tipo de información.' },
            { en: 'First row = column headings.', es: 'Primera fila = encabezados de columna.' },
            { en: 'A clean list is what makes everything else possible.', es: 'Una lista limpia es lo que hace posible todo lo demás.' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'job5-l3',
      emoji: '🧮',
      minutes: 5,
      title: { en: 'Make the numbers add up', es: 'Haz que los números salgan' },
      steps: [
        {
          type: 'teach',
          title: { en: 'A formula is an instruction starting with =', es: 'Una fórmula es una instrucción que empieza con =' },
          body: [
            {
              en: 'Type an **equals sign** in a cell and Excel stops treating what follows as text and starts treating it as a **calculation**. That is the whole idea.',
              es: 'Escribe un **signo de igual** en una celda y Excel deja de tratar lo que sigue como texto y empieza a tratarlo como un **cálculo**. Esa es toda la idea.',
            },
            {
              en: '**=SUM(B2:B10)** means "add up everything from B2 through B10." It is the formula you will use more than all others combined.',
              es: '**=SUMA(B2:B10)** significa «suma todo desde B2 hasta B10». Es la fórmula que usarás más que todas las demás juntas.',
            },
            {
              en: 'Plain arithmetic works too: **=B2*C2** multiplies two cells — quantity times price, for a row total. **+**, **-**, **\\***, and **/** all do what you expect.',
              es: 'La aritmética normal también funciona: **=B2*C2** multiplica dos celdas — cantidad por precio, para el total de una fila. **+**, **-**, **\\*** y **/** hacen lo que esperas.',
            },
            {
              en: 'Two more worth knowing: **=AVERAGE(C2:C10)** for an average, and **=COUNT(A2:A10)** to count how many entries there are.',
              es: 'Dos más que vale la pena saber: **=PROMEDIO(C2:C10)** para un promedio, y **=CONTAR(A2:A10)** para contar cuántas entradas hay.',
            },
          ],
          callout: {
            en: 'You point a formula at **cell addresses**, not at typed-in numbers. That way when a price changes, the total updates itself.',
            es: 'Apuntas una fórmula a **direcciones de celda**, no a números escritos. Así, cuando un precio cambia, el total se actualiza solo.',
          },
          calloutTone: 'grass',
          calloutEmoji: '💡',
        },
        {
          type: 'choice',
          prompt: {
            en: 'Your expenses are in cells B2 through B15. Which formula gives the total?',
            es: 'Tus gastos están en las celdas B2 a B15. ¿Qué fórmula da el total?',
          },
          options: [
            {
              id: 'a',
              emoji: '🧮',
              label: { en: '=SUM(B2:B15)', es: '=SUMA(B2:B15)' },
              correct: true,
            },
            {
              id: 'b',
              emoji: '📝',
              label: { en: 'SUM(B2:B15)', es: 'SUMA(B2:B15)' },
              why: {
                en: 'So close — without the equals sign at the front, Excel treats it as plain text and just displays the letters.',
                es: 'Casi — sin el signo de igual al inicio, Excel lo trata como texto y solo muestra las letras.',
              },
            },
            {
              id: 'c',
              emoji: '🔢',
              label: { en: '=B2+B15', es: '=B2+B15' },
              why: {
                en: 'That adds only the first and last cells, skipping everything in between. The colon range covers them all.',
                es: 'Eso suma solo la primera y la última celda, saltándose todo lo de en medio. El rango con dos puntos las cubre todas.',
              },
            },
          ],
        },
        {
          type: 'choice',
          prompt: {
            en: 'Quantity is in B2, price per item in C2. Which gives the total cost for that row?',
            es: 'La cantidad está en B2, el precio por artículo en C2. ¿Qué da el costo total de esa fila?',
          },
          options: [
            {
              id: 'a',
              emoji: '✖️',
              label: { en: '=B2*C2', es: '=B2*C2' },
              correct: true,
            },
            {
              id: 'b',
              emoji: '➕',
              label: { en: '=B2+C2', es: '=B2+C2' },
              why: {
                en: 'That adds the quantity to the price, which is not a meaningful number. Twenty pens at $1.50 is 20 × 1.50.',
                es: 'Eso suma la cantidad al precio, que no es un número con sentido. Veinte plumas a $1.50 es 20 × 1.50.',
              },
            },
          ],
        },
        {
          type: 'recap',
          points: [
            { en: 'A formula starts with = — that is what makes it calculate.', es: 'Una fórmula empieza con = — eso la hace calcular.' },
            { en: '=SUM(range) totals; =B2*C2 multiplies two cells.', es: '=SUMA(rango) totaliza; =B2*C2 multiplica dos celdas.' },
            { en: 'Point at cells, not typed numbers, so totals update themselves.', es: 'Apunta a celdas, no a números escritos, para que los totales se actualicen solos.' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'job5-l4',
      emoji: '⬇️',
      minutes: 4,
      title: { en: 'Copy a formula down', es: 'Copia una fórmula hacia abajo' },
      steps: [
        {
          type: 'teach',
          title: { en: 'Write it once, apply it to every row', es: 'Escríbela una vez, aplícala a cada fila' },
          body: [
            {
              en: 'You do not write a formula fifteen times. Write it once in the first row, then **drag the small square at the bottom-right corner of the cell** downward. Excel fills the rest in.',
              es: 'No escribes una fórmula quince veces. Escríbela una vez en la primera fila, y luego **arrastra el cuadrito de la esquina inferior derecha de la celda** hacia abajo. Excel llena el resto.',
            },
            {
              en: 'The clever part: it **adjusts as it goes**. A formula that said =B2*C2 becomes =B3*C3 on the next row, then =B4*C4. Each row calculates from its own numbers.',
              es: 'Lo ingenioso: se **ajusta conforme baja**. Una fórmula que decía =B2*C2 se vuelve =B3*C3 en la siguiente fila, luego =B4*C4. Cada fila calcula con sus propios números.',
            },
            {
              en: 'That little square is called the **fill handle**, and dragging it is one of the highest-value things you can learn in Excel.',
              es: 'Ese cuadrito se llama **controlador de relleno**, y arrastrarlo es de las cosas más valiosas que puedes aprender en Excel.',
            },
          ],
          callout: {
            en: 'Always spot-check one or two of the filled-in rows. A formula can be typed perfectly and still point at the wrong cells.',
            es: 'Siempre revisa una o dos de las filas rellenadas. Una fórmula puede estar perfectamente escrita y aun así apuntar a las celdas equivocadas.',
          },
        },
        {
          type: 'action',
          title: { en: 'Build a small tracker', es: 'Arma un control pequeño' },
          body: [
            {
              en: 'On a computer, open Excel or Google Sheets and make a short supplies list: headings in row 1 (Item, Quantity, Price, Total), then five items.',
              es: 'En una computadora, abre Excel o Google Sheets y haz una lista corta de insumos: encabezados en la fila 1 (Artículo, Cantidad, Precio, Total), y luego cinco artículos.',
            },
            {
              en: 'In the Total column of the first item, type a formula multiplying quantity by price. Then drag the fill handle down to the other four rows and check each one calculated correctly.',
              es: 'En la columna Total del primer artículo, escribe una fórmula que multiplique cantidad por precio. Luego arrastra el controlador de relleno hacia las otras cuatro filas y revisa que cada una calculó bien.',
            },
            {
              en: 'Finally, put a =SUM formula at the bottom of the Total column to get the grand total.',
              es: 'Por último, pon una fórmula =SUMA al final de la columna Total para obtener el gran total.',
            },
          ],
          copyText: '=B2*C2',
        },
        {
          type: 'recap',
          points: [
            { en: 'Write the formula once, drag the fill handle down.', es: 'Escribe la fórmula una vez, arrastra el controlador de relleno.' },
            { en: 'It adjusts each row to use that row\'s own cells.', es: 'Se ajusta en cada fila para usar las celdas de esa fila.' },
            { en: 'Spot-check a couple of rows afterwards.', es: 'Revisa un par de filas después.' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'job5-l5',
      emoji: '💲',
      minutes: 4,
      title: { en: 'Make the sheet readable', es: 'Haz la hoja legible' },
      steps: [
        {
          type: 'teach',
          title: { en: 'Tell Excel what kind of number it is', es: 'Dile a Excel qué tipo de número es' },
          body: [
            {
              en: 'A raw **1250.5** in a cell is hard to read. Formatted as currency it becomes **$1,250.50** — same number, instantly clearer.',
              es: 'Un **1250.5** crudo en una celda es difícil de leer. Con formato de moneda se vuelve **$1,250.50** — el mismo número, al instante más claro.',
            },
            {
              en: 'Select the cells, then pick a format: **currency** for money, **percentage** for rates, **date** for dates. Excel keeps the underlying number and just changes how it looks.',
              es: 'Selecciona las celdas, y elige un formato: **moneda** para dinero, **porcentaje** para tasas, **fecha** para fechas. Excel conserva el número de fondo y solo cambia cómo se ve.',
            },
            {
              en: 'Two more small things that make a sheet look professional: **bold the heading row**, and **widen columns** so nothing is cut off. Double-clicking the line between column letters auto-fits the width.',
              es: 'Dos cosas más que hacen que una hoja se vea profesional: **pon en negritas la fila de encabezados**, y **ensancha las columnas** para que nada quede cortado. Doble clic en la línea entre las letras de columna ajusta el ancho solo.',
            },
          ],
          callout: {
            en: 'Seeing **#####** in a cell does not mean an error — it means the column is too narrow for the number. Widen it.',
            es: 'Ver **#####** en una celda no significa error — significa que la columna es muy angosta para el número. Ensánchala.',
          },
          calloutEmoji: '↔️',
        },
        {
          type: 'choice',
          prompt: {
            en: 'A cell shows ##### instead of a number. What is wrong?',
            es: 'Una celda muestra ##### en vez de un número. ¿Qué pasa?',
          },
          options: [
            {
              id: 'a',
              emoji: '↔️',
              label: { en: 'The column is too narrow — widen it', es: 'La columna es muy angosta — ensánchala' },
              correct: true,
            },
            {
              id: 'b',
              emoji: '💥',
              label: { en: 'The formula is broken', es: 'La fórmula está rota' },
              why: {
                en: 'A broken formula shows an error message starting with #, like #VALUE!. Plain ##### is only ever a width problem.',
                es: 'Una fórmula rota muestra un mensaje de error que empieza con #, como #¡VALOR!. ##### a secas siempre es solo un problema de ancho.',
              },
            },
          ],
        },
        {
          type: 'recap',
          points: [
            { en: 'Format money as currency, dates as dates.', es: 'Da formato de moneda al dinero, de fecha a las fechas.' },
            { en: 'Bold the heading row; widen columns to fit.', es: 'Pon en negritas los encabezados; ensancha las columnas.' },
            { en: '##### just means the column is too narrow.', es: '##### solo significa que la columna es muy angosta.' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'job5-l6',
      emoji: '🔍',
      minutes: 5,
      title: { en: 'Sort and filter safely', es: 'Ordena y filtra sin romper nada' },
      steps: [
        {
          type: 'teach',
          title: { en: 'The one mistake that ruins a spreadsheet', es: 'El error que arruina una hoja de cálculo' },
          body: [
            {
              en: '**Sorting** reorders your rows — alphabetically, by date, biggest number first, whatever you need. **Filtering** temporarily hides rows that do not match, so you can look at just one vendor or one month.',
              es: '**Ordenar** reacomoda tus filas — alfabéticamente, por fecha, del número más grande al más chico, lo que necesites. **Filtrar** esconde temporalmente las filas que no coinciden, para que veas solo un proveedor o un mes.',
            },
            {
              en: 'Here is the dangerous part. If you select **one column** and sort it, only that column moves — and every row is now scrambled, with the wrong price next to the wrong item. The data is quietly destroyed.',
              es: 'Aquí está la parte peligrosa. Si seleccionas **una columna** y la ordenas, solo esa columna se mueve — y ahora cada fila está revuelta, con el precio equivocado junto al artículo equivocado. Los datos quedan destruidos en silencio.',
            },
            {
              en: 'So: **select the whole table** (or just click one cell inside it and let Excel detect the range) before sorting. Then every row moves together and stays intact.',
              es: 'Entonces: **selecciona toda la tabla** (o solo haz clic en una celda adentro y deja que Excel detecte el rango) antes de ordenar. Así cada fila se mueve junta y queda intacta.',
            },
          ],
          callout: {
            en: 'A **filter** only hides rows — it never deletes them. Clear the filter and everything comes back. That makes filtering completely safe to experiment with.',
            es: 'Un **filtro** solo esconde filas — nunca las borra. Quita el filtro y todo regresa. Eso hace que filtrar sea completamente seguro para experimentar.',
          },
          calloutTone: 'grass',
        },
        {
          type: 'choice',
          prompt: {
            en: 'You want to sort your supply list by price. What do you select first?',
            es: 'Quieres ordenar tu lista de insumos por precio. ¿Qué seleccionas primero?',
          },
          options: [
            {
              id: 'a',
              emoji: '📊',
              label: { en: 'The whole table, or one cell inside it', es: 'Toda la tabla, o una celda adentro' },
              correct: true,
            },
            {
              id: 'b',
              emoji: '⚠️',
              label: { en: 'Just the Price column', es: 'Solo la columna de Precio' },
              why: {
                en: 'This is the mistake that scrambles a spreadsheet — prices move but item names stay put, and now every row is wrong. Select the whole table.',
                es: 'Este es el error que revuelve una hoja — los precios se mueven pero los nombres se quedan, y ahora cada fila está mal. Selecciona toda la tabla.',
              },
            },
          ],
        },
        {
          type: 'choice',
          prompt: {
            en: 'You filtered to show only one vendor, and now most of your rows are gone. What happened?',
            es: 'Filtraste para ver solo un proveedor, y ahora casi todas tus filas desaparecieron. ¿Qué pasó?',
          },
          options: [
            {
              id: 'a',
              emoji: '👀',
              label: { en: 'They are hidden, not deleted — clear the filter to see them', es: 'Están escondidas, no borradas — quita el filtro para verlas' },
              correct: true,
            },
            {
              id: 'b',
              emoji: '😱',
              label: { en: 'They were deleted and need to be retyped', es: 'Se borraron y hay que reescribirlas' },
              why: {
                en: 'Filters never delete anything. Clearing the filter brings every row straight back.',
                es: 'Los filtros nunca borran nada. Quitar el filtro trae todas las filas de vuelta.',
              },
            },
          ],
        },
        {
          type: 'recap',
          points: [
            { en: 'Select the whole table before sorting — never one column.', es: 'Selecciona toda la tabla antes de ordenar — nunca una columna.' },
            { en: 'Filtering hides rows temporarily; it never deletes.', es: 'Filtrar esconde filas temporalmente; nunca borra.' },
            { en: 'Clear the filter when you are done looking.', es: 'Quita el filtro cuando termines de ver.' },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'job5-l7',
      emoji: '🖨️',
      minutes: 4,
      title: { en: 'Print without surprises', es: 'Imprime sin sorpresas' },
      steps: [
        {
          type: 'teach',
          title: { en: 'Always preview first', es: 'Siempre revisa la vista previa' },
          body: [
            {
              en: 'Spreadsheets print badly by default. A sheet that looks fine on screen will happily spill across six pages with three columns stranded on the last one.',
              es: 'Las hojas de cálculo se imprimen mal por defecto. Una hoja que se ve bien en pantalla felizmente se desparrama en seis páginas con tres columnas varadas en la última.',
            },
            {
              en: 'The **print preview** shows you exactly what will come out before you waste paper. Look at it every single time.',
              es: 'La **vista previa de impresión** te muestra exactamente qué va a salir antes de desperdiciar papel. Míra la siempre.',
            },
            {
              en: 'Three fixes handle almost every problem: switch to **landscape** orientation for wide tables, use **fit to one page wide** so columns do not get orphaned, and set the heading row to **repeat at the top** of every page.',
              es: 'Tres arreglos resuelven casi todo: cambia a orientación **horizontal** para tablas anchas, usa **ajustar a una página de ancho** para que las columnas no queden huérfanas, y haz que la fila de encabezados **se repita arriba** en cada página.',
            },
          ],
          callout: {
            en: 'Saving as a PDF instead of printing is often better — it is easier to email, and what you see in the preview is exactly what the recipient gets.',
            es: 'Guardar como PDF en vez de imprimir muchas veces es mejor — es más fácil de mandar por correo, y lo que ves en la vista previa es exactamente lo que recibe quien lo abre.',
          },
        },
        {
          type: 'action',
          title: { en: 'Preview your tracker', es: 'Previsualiza tu control' },
          body: [
            {
              en: 'Open the supplies tracker you built earlier. Go to Print (or Print Preview) and look at how it would come out.',
              es: 'Abre el control de insumos que armaste antes. Ve a Imprimir (o Vista previa) y mira cómo saldría.',
            },
            {
              en: 'Try switching between portrait and landscape and watch what changes. Then save it as a PDF rather than printing it, and open the PDF to confirm it looks right.',
              es: 'Prueba cambiar entre vertical y horizontal y observa qué cambia. Luego guárdalo como PDF en vez de imprimirlo, y abre el PDF para confirmar que se ve bien.',
            },
          ],
        },
        {
          type: 'recap',
          points: [
            { en: 'Always check print preview before printing.', es: 'Siempre revisa la vista previa antes de imprimir.' },
            { en: 'Landscape and fit-to-one-page-wide fix most problems.', es: 'Horizontal y ajustar-a-una-página arreglan casi todo.' },
            { en: 'Saving as PDF is often better than printing.', es: 'Guardar como PDF muchas veces es mejor que imprimir.' },
          ],
        },
      ],
    },
  ],
}
