const editor = grapesjs.init({
    container: '#gjs',
    fromElement: true,
    height: '400px',
    width: 'auto',
    canvas: {
        styles: ['https://fonts.googleapis.com/css2?family=Overpass:wght@100;300;400;500;700&display=swap',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css']
    },
    storageManager: false,
    panels: {defaults: []},
    blockManager: {
        appendTo: '#blocks',
    },
    layerManager: {
        appendTo: '.layers-container'
    },
    cssIcons: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css',
    // We define a default panel as a sidebar to contain layers
    panels: {
        defaults: [
            {
                id: 'layers',
                el: '.panel__right',
                // Make the panel resizable
                resizable: {
                    maxDim: 350,
                    minDim: 200,
                    tc: 0, // Top handler
                    cl: 1, // Left handler
                    cr: 0, // Right handler
                    bc: 0, // Bottom handler
                    // Being a flex child we need to change `flex-basis` property
                    // instead of the `width` (default)
                    keyWidth: 'flex-basis',
                }
            },
            {
                id: 'panel-switcher',
                el: '.panel__switcher',
                buttons: [{
                    id: 'show-layers',
                    active: true,
                    label: 'Layers',
                    command: 'show-layers',
                    // Once activated disable the possibility to turn it off
                    togglable: false,
                }, {
                    id: 'show-style',
                    active: true,
                    label: 'Styles',
                    command: 'show-styles',
                    togglable: false,
                }],
            }
        ]
    },
    selectorManager: {
        appendTo: '.styles-container'
    },
    styleManager: {
        appendTo: '.styles-container',
        sectors: [{
            name: 'Dimension',
            open: false,
            // Use built-in properties
            buildProps: ['width', 'min-height', 'padding'],
            // Use `properties` to define/override single property
            properties: [
                {
                    // Type of the input,
                    // options: integer | radio | select | color | slider | file | composite | stack
                    type: 'integer',
                    name: 'The width', // Label for the property
                    property: 'width', // CSS property (if buildProps contains it will be extended)
                    units: ['px', '%'], // Units, available only for 'integer' types
                    defaults: 'auto', // Default value
                    min: 0, // Min value, available only for 'integer' types
                }
            ]
        }, {
            name: 'Extra',
            open: false,
            buildProps: ['background-color', 'justify-content', 'color', 'font-size'],
        }]
    },
});
editor.Commands.add('show-layers', {
    getRowEl(editor) { return editor.getContainer().closest('.editor-row'); },
    getLayersEl(row) { return row.querySelector('.layers-container') },

    run(editor, sender) {
        const lmEl = this.getLayersEl(this.getRowEl(editor));
        lmEl.style.display = '';
    },
    stop(editor, sender) {
        const lmEl = this.getLayersEl(this.getRowEl(editor));
        lmEl.style.display = 'none';
    },
});
editor.Commands.add('show-styles', {
    getRowEl(editor) { return editor.getContainer().closest('.editor-row'); },
    getStyleEl(row) { return row.querySelector('.styles-container') },

    run(editor, sender) {
        const smEl = this.getStyleEl(this.getRowEl(editor));
        smEl.style.display = '';
    },
    stop(editor, sender) {
        const smEl = this.getStyleEl(this.getRowEl(editor));
        smEl.style.display = 'none';
    },
});


editor.BlockManager.add('button', {
    id: 'button',
    name: 'button',
    label: 'Button',
    content: {
        tagName: 'div',
        style: {
            display: 'flex',
            'justify-content': 'center',
            'font-family': "'Overpass', sans-serif !important",
            'padding': '5px 0'
        },
        name: 'Button',
        components: [
            {
                tagName: 'button',
                type: 'text',
                hoverable: true,
                selectable: true,
                draggable: false,
                layerable: false,
                editable: true,
                style: {
                    background: 'rgba(5, 202, 182, 1)',
                    'font-size': '15px',
                    color: 'white',
                    padding: '14px 42px 14px 42px',
                    border: '2px solid rgba(5, 202, 182, 0)',
                    'font-weight': '700',
                    'line-height': '1.6',
                    'cursor': 'pointer',
                    'border-radius': '2px',
                    'font-family': 'Overpass, sans-serif'
                },
                content: 'BUTTON'
            }
        ]
    }
})

editor.BlockManager.add('text', {
    id: 'text',
    name: 'text',
    label: 'Text',
    content: {
        tagName: 'div',
        style: {
        },
        name: 'Text',
        components: [
            {
                tagName: 'p',
                type: 'text',
                hoverable: true,
                selectable: true,
                draggable: false,
                layerable: false,
                editable: true,
                style: {
                    color: '#666666',
                    'font-size': '16px',
                    'text-align': 'center',
                    'font-family': 'Overpass, sanf-serif'
                },
                content: 'The point of using dummy text for your paragraph is that it has a more-or-less normal distribution of letters. making it look like readable English.'
            }
        ]
    }
})

editor.BlockManager.add('spacer', {
    id: 'spacer',
    name: 'spacer',
    label: 'Spacer  ',
    content: {
        tagName: 'div',
        name: 'Icon',
        style: {
          display: 'flex',
          'justify-content': 'center',
            height: 'auto',
            padding: '5px 0'
        },
        components: [
            {
                tagName: 'i',
                attributes: { class: 'fas fa-star' },
                hoverable: true,
                selectable: true,
                draggable: false,
                layerable: false,
                editable: true,
                style: {
                    color: 'rgba(5, 202, 182, 1)',
                    'font-size': '50px',
                    'text-align': 'center',
                    'height': 'auto'
                },
                content: ''
            }
        ]
    }
})

editor.BlockManager.add('icon', {
    id: 'icon',
    name: 'icon',
    label: 'Icon',
    content: {
        tagName: 'div',
        name: 'Icon',
        style: {
            display: 'flex',
            'justify-content': 'center',
            height: 'auto',
            padding: '5px 0'
        },
        components: [
            {
                tagName: 'i',
                attributes: { class: 'fas fa-star' },
                hoverable: true,
                selectable: true,
                draggable: false,
                layerable: false,
                editable: true,
                style: {
                    color: 'rgba(5, 202, 182, 1)',
                    'font-size': '50px',
                    'text-align': 'center',
                    'height': 'auto'
                },
                content: ''
            }
        ]
    }
})




