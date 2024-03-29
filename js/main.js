const app = new Vue({
    el: '#root',
    data: {
        contacts: [
            {
                name: 'Michele',
                avatar: '_1',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Hai portato a spasso il cane?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Ricordati di dargli da mangiare',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 16:15:22',
                        message: 'Tutto fatto!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Fabio',
                avatar: '_2',
                visible: true,
                messages: [{
                    date: '20/03/2020 16:30:00',
                    message: 'Ciao come stai?',
                    status: 'sent'
                },
                    {
                        date: '20/03/2020 16:30:55',
                        message: 'Bene grazie! Stasera ci vediamo?',
                        status: 'received'
                    },
                    {
                        date: '20/03/2020 16:35:00',
                        message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                        status: 'sent'
                    }
                ],
            },
            {
                name: 'Samuele',
                avatar: '_3',
                visible: true,
                messages: [{
                    date: '28/03/2020 10:10:40',
                    message: 'La Marianna va in campagna',
                    status: 'received'
                },
                    {
                        date: '28/03/2020 10:20:10',
                        message: 'Sicuro di non aver sbagliato chat?',
                        status: 'sent'
                    },
                    {
                        date: '28/03/2020 16:15:22',
                        message: 'Ah scusa!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Luisa',
                avatar: '_4',
                visible: true,
                messages: [{
                    date: '10/01/2020 15:30:55',
                    message: 'Lo sai che ha aperto una nuova pizzeria?',
                    status: 'sent'
                },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Si, ma preferirei andare al cinema',
                        status: 'received'
                    }
                ],
            },
        ],
        contactIndex: 0,
        typeMessage: '',
        time: new Date(),
        timeout1: null,
        timeout2: null,
        search: '',
        dropdown: {
            visible: false,
            indexMsg: null
        },
        darkMode: '',
        darkModeOnOff: false
    },
    computed: {
        filteredContacts() {
            this.contacts.map((c, i) => {
                c.index = i;
            });
            return this.contacts.filter(c => {
                if (c.name.toLowerCase().includes(this.search.toLowerCase())) {
                    return c.name.toLowerCase().includes(this.search.toLowerCase());
                }
            });
        }
    },
    methods: {
        sendMessage: function() {
            if (this.timeout1 != null || this.timeout2 != null) {
                clearTimeout(this.timeout1);
                clearTimeout(this.timeout2);
            }
            if (this.typeMessage != '') {
                this.contacts[this.contactIndex].messages.push({
                        date: this.time.getDate() + '/0' + (this.time.getMonth() + 1) + '/' + this.time.getFullYear() + ' ' + this.time.getHours() + ':' + this.time.getMinutes() + ':' + this.time.getSeconds(),
                        message: this.typeMessage,
                        status: 'sent'
                })
                this.timeout1 = setTimeout(
                    () => {
                        let d = new Date();
                        this.contacts[this.contactIndex].messages.push({
                            date: d.getDate() + '/0' + (d.getMonth() + 1) + '/' + d.getFullYear() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds(),
                            message: 'Ora non posso rispondere',
                            status: 'received'
                        })
                    }, 1000);
                this.timeout2 = setTimeout(
                    () => {
                        let d = new Date();
                        this.contacts[this.contactIndex].messages.push({
                            date: d.getDate() + '/0' + (d.getMonth() + 1) + '/' + d.getFullYear() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds(),
                            message: 'Ci sentiamo dopo!',
                            status: 'received'
                        })
                    }, 2000);
            }
            this.typeMessage = '';
        },
        lastAccess: function() {
            return this.time.getHours() + ':' + this.time.getMinutes();
        },
        selectDropdown: function(i) {
            this.dropdown.indexMsg = i;
            this.dropdown.visible = !this.dropdown.visible;
        },
        deleteMessage: function (i) {
            this.contacts[this.contactIndex].messages.splice(i, 1);
        },
        toggleDarkMode: function() {
            this.darkModeOnOff = !this.darkModeOnOff;
            if (this.darkModeOnOff == true) {
                this.darkMode = 'dark';
            } else if (this.darkModeOnOff == false) {
                this.darkMode = '';
            }
        }
    }
})