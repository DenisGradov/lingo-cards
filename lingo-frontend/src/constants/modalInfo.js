import { languages } from '../constants/mainConstants.js';

export const modalInfo = [
    {
        type: 'Teach',
        title: 'Short-term memory',
        description: `This number means how many words and phrases you have in your short-term memory. 
                  You won't find these study cards for some time if you don't use a filter to include the cards you already know.`,
        hasCloseButton: true,
        buttons: [{ name: 'Show familiar cards', func: () => console.log('Showing familiar cards') }],
        inputs:[],
        textareas:[],
        selects:[],
        formButtons:[],
    },
    {
        type: 'I know',
        title: 'Almost there!',
        description: `These are the words you already know well, but there’s still room for improvement. 
                  Keep practicing to strengthen your knowledge and move these words to the "Learned" category.`,
        hasCloseButton: true,
        buttons: [{ name: 'Review these words', func: () => console.log('Reviewing words') }],
        inputs:[],
        textareas:[],
        selects:[],
        formButtons:[],
    },
    {
        type: 'Learned',
        title: 'Mastered!',
        description: `These are the words you have mastered. However, it’s important to review them regularly 
                  to ensure long-term retention. Keep them in mind to avoid forgetting!`,
        hasCloseButton: true,
        buttons: [{ name: 'Review learned words', func: () => console.log('Reviewing learned words') }],
        inputs:[],
        textareas:[],
        selects:[],
        formButtons:[],
    },

    {
        type: 'Create playlist',
        title: 'Create playlist',
        description: `Create playlist to orgnize your words.`,
        hasCloseButton: true,
        buttons: [],
        
        inputs:[{name:"name", type:"text"}],
        textareas:[{name:"description"}],
        selects:[{name:"language", options:[languages.en,languages.ua,languages.nl]}],
        formButtons:[{name:"Create"}],
    },
    {
        type: 'Create word',
        title: 'Add New Word',
        description: `Add a word to your vocabulary.`,
        hasCloseButton: true,
        buttons: [],
        inputs: [
            { name: "word", type: "text" },
            { name: "translation", type: "text" }
        ],
        textareas: [],
        selects: [],
        formButtons: [{ name: "Add Word" }],
    },
    {
        type: 'Edit Word',
        title: 'Edit Word',
        description: 'Edit the details of your word',
        hasCloseButton: true,
        buttons: [],
        inputs: [
            { name: 'word', type: 'text' },
            { name: 'translation', type: 'text' },
        ],
        textareas: [],
        selects: [],
        formButtons: [{ name: 'Save' }, { name: 'Delete' }],
    },
];
