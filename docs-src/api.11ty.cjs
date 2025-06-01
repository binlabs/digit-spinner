/**
 * This page generates its content from the custom-element.json file as read by
 * the _data/api.11tydata.js script.
 */

// Array of element tag names to include in documentation, in the order they should appear
const DOCUMENTED_ELEMENTS = ['digit-spinner', 'spinning-digit'];

module.exports = class Docs {
  data() {
    return {
      layout: 'page.11ty.cjs',
      title: '<digit-spinner> ⌲ API Documentation',
    };
  }
  render(data) {
    const manifest = data['api.11tydata'].customElements;
    const allElements = manifest.modules.reduce(
      (els, module) =>
        els.concat(
          module.declarations?.filter((dec) => dec.customElement) ?? []
        ),
      []
    );

    // Filter and sort elements based on DOCUMENTED_ELEMENTS array
    const elements = DOCUMENTED_ELEMENTS.map((tagName) =>
      allElements.find((el) => el.tagName === tagName)
    ).filter(Boolean);

    return `
     <h1>API</h1>
     ${elements
       .map(
         (element) => `
       <h2>&lt;${element.tagName}></h2>
       <div>
         ${element.description}
       </div>
       ${renderTable(
         'Attributes',
         ['name', 'description', 'type.text', 'default'],
         element.attributes,
         element.tagName
       )}
       ${renderTable(
         'Properties',
         ['name', 'attribute', 'description', 'type.text', 'default'],
         element.members.filter(
           (m) => m.kind === 'field' && m.privacy !== 'private'
         ),
         element.tagName
       )}  
       ${renderTable(
         'Methods',
         ['name', 'parameters', 'description', 'return.type.text'],
         element.members
           .filter((m) => m.kind === 'method' && m.privacy !== 'private')
           .map((m) => ({
             ...m,
             parameters: renderTable(
               '',
               ['name', 'description', 'type.text'],
               m.parameters
             ),
           })),
         element.tagName
       )}
       ${renderTable(
         'Events',
         ['name', 'description'],
         element.events,
         element.tagName
       )}    
       ${renderTable(
         'Slots',
         [['name', '(default)'], 'description'],
         element.slots,
         element.tagName
       )}  
       ${renderTable(
         'CSS Shadow Parts',
         ['name', 'description'],
         element.cssParts,
         element.tagName
       )}
       ${renderTable(
         'CSS Custom Properties',
         ['name', 'description'],
         element.cssProperties,
         element.tagName
       )}
       `
       )
       .join('')}
   `;
  }
};

/**
 * Reads a (possibly deep) path off of an object.
 */
const get = (obj, path) => {
  let fallback = '';
  if (Array.isArray(path)) {
    [path, fallback] = path;
  }
  const parts = path.split('.');
  while (obj && parts.length) {
    obj = obj[parts.shift()];
  }
  return obj == null || obj === '' ? fallback : obj;
};

/**
 * Renders a table of data, plucking the given properties from each item in
 * `data`.
 */
const renderTable = (name, properties, data, elementName) => {
  if (data === undefined || data.length === 0) {
    return '';
  }
  const headingId = `${elementName}-${name}`
    .replace(/[^a-z0-9]+/gi, '-')
    .toLowerCase();
  return `
   ${name ? `<h3 id="${headingId}">${name}</h3>` : ''}
   <table>
     <tr>
       ${properties
         .map(
           (p) =>
             `<th>${capitalize(
               (Array.isArray(p) ? p[0] : p).split('.')[0]
             )}</th>`
         )
         .join('')}
     </tr>
     ${data
       .map(
         (i) => `
       <tr>
         ${properties.map((p) => `<td>${get(i, p)}</td>`).join('')}
       </tr>
     `
       )
       .join('')}
   </table>
 `;
};

const capitalize = (s) => s[0].toUpperCase() + s.substring(1);
