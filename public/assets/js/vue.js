var app = Vue.createApp({
    data() {
        return {
            api: 'https://script.google.com/macros/s/AKfycbz0XPRfGGN0WJM1-fXIu4-RgfmaxB_02IhxEQY1odzBARbrf0scwAZXCUijx335Du4V3w/exec',
            tabs: '',
            sub: '',
            newsletter: '',

            company: 'ICD',
            // send a message form
            message: '',
            subject: '',
            username: '',
            useremail: '',
            profile: [],
            currentTab: '',
            currentList: '',
            spinner: true,
            lang: 'arb'
        }
    },
    methods: {
        initTarjama(res) {

            this.profile.heading = this.tarjem(res.heading)
            this.profile.bio = this.tarjem(res.bio)
            this.profile.about1 = this.tarjem(res.about1)
            this.profile.about2 = this.tarjem(res.about2)
            this.profile.mission = this.tarjem(res.mission)
            this.profile.vision = this.tarjem(res.vision)

            // SERVICES
            this.profile.services.forEach(e => {
                // console.log(e)
                e.title = this.tarjem(e.title)
                e.description = this.tarjem(e.description)
            });
            // FAQ
            this.profile.faq.forEach(e => {
                // console.log(e)
                e.question = this.tarjem(e.question)
                e.answer = this.tarjem(e.answer)
            });
            // Media
            this.profile.tabs.forEach(tab => {
                this.profile.media[tab].forEach(e => {

                    e.title = this.tarjem(e.title)
                    e.description = this.tarjem(e.description)
                })
            });

        },
        toggleLanguage(lang) {
            this.spinner = true
            this.lang = lang

            fetch(this.api).then(res => res.json()).then(res => {
                console.log(res)
                this.profile = res
                this.spinner = false
                this.getAllMedia()
                this.sub = this.api + '?subscribe=1'
                this.initTarjama(res)
            })
        },
        tarjem(text) {
            // console.log(text.indexOf(`${this.lang}::`))
            text = text.slice(text.indexOf(`${this.lang}::`), text.length)
            // console.log(text.indexOf(';;'))
            // console.log(text.slice(0 + 5, text.indexOf(';;')))
            return text.slice(0 + 5, text.indexOf(';;'))
        },
        subscribe() {
            fetch(this.sub, {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'text/plain',
                },
                body: this.newsletter
            }).then(res => res.json()).then(res => {
                alert('Thank You !')
                this.newsletter = ''
            })
        },

        setCurrentTab(tab) {
            this.currentTab = tab
            this.currentList = this.profile.media[this.currentTab];
            // console.log(currentTab)
            // console.log(this.currentList)
        },

        encode(x) {
            return encodeURIComponent(x)
        },
        getAllMedia() {
            var arr = []
            var res = this.profile
            for (let i = 0; i < res.tabs.length; i++) {
                // console.log(res.products[res.tabs[i]])
                arr.push(res.media[res.tabs[i]][0])
                // arr.push(res.products[res.tabs[i]][1])

            }
            this.currentList = arr
        },
    },

    mounted() {
        this.spinner = true

        fetch(this.api).then(res => res.json()).then(res => {
            console.log(res)
            this.profile = res
            this.xprofile = res
            // this.initTranslation()
            this.spinner = false
            this.getAllMedia()
            this.sub = this.api + '?subscribe=1'
            this.initTarjama(res)


        })

        // console.log(this.currentList)
    }
})


app.component('card', {
    template:
        /*html*/
        `
        <!-- P O T  -->
        <div class="card-pot my-3" :style="'width: '+width+'px;'">

            <div class="shadow-sm bg-light rounded scale-in-center">
                <!-- customized ratio control -->
                <img :src="url" :alt="imgAlt" class="img-fluid rounded-top">
                <div class="card-body d-flex justify-content-between align-items-center p-3">
                    <h5 class="lh-base ">{{title}}</h5>
                    <i class="bi bi-three-dots-vertical fs-4 point" data-bs-toggle="modal"
                        :data-bs-target="'#'+id" style="color:#8d99ae;"></i>
                </div>
            </div>
            <!-- Modal -->
            <div class="modal fade" :id="id" tabindex="-1">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <img :src="url" class="img-fluid rounded me-3" style="width:50px;height:50px;">
                            <h5 class="modal-title ls-2">{{title}}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"
                                aria-label="Close">
                            </button>
                        </div>
                        <div class="modal-body">
                            {{info}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    props: ['url', 'title', 'info', 'imgAlt', 'width', 'id'],
})


app.component('team', {
    template:
        /*html*/
        `
        <div class="team shadow bg-light rounded scale-in-center my-3" style="width: 250px">
            <!-- customized ratio control -->
            <img :src="url" alt="imgAlt" class="img-fluid rounded-top">
            <div class="p-3">
                <h6 class="lh-base text-center"> {{name}} - <span class="text-secondary">{{position}}</span> </h6>
            </div>
        </div>
        
    `,
    props: ['url', 'name', 'position', 'imgAlt', 'width', 'id'],
})

app.component('faq', {
    template:
        /*html*/
        `

    <div class="faq container d-flex align-items-center p-3 rounded shadow-sm bg-light my-3 point" data-bs-toggle="modal" :data-bs-target="'#'+index">
        <i class="bi bi-chat-square-text fs-4 me-3 text-primary"></i>
        <strong class="fs-6"> {{question}} </strong>

        <i class="bi bi-arrows-angle-expand ms-auto fs-5 point text-secondary point" data-bs-toggle="modal"
            :data-bs-target="'#'+index"></i>


        <!-- Modal -->
        <div class="modal fade" :id="index" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">

                        <i class="bi bi-chat-square-text fs-4 text-primary"></i>
                        <h5 class="modal-title fs-6 mx-auto">{{question}}</h5>
                        <i class="bi bi-arrow-return-right fs-4 point" data-bs-dismiss="modal" aria-label="Close"></i>
                    </div>
                    <div class="modal-body">
                        <slot>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,
    props: ['question', 'index']
})

app.component('swiper', {
    template:
        /*html*/
        `
    <!-- Swiper -->
    <div class="swiper">
        <div class="swiper-wrapper">
            <div v-for="l in list" class="swiper-slide " :style="'width:'+w+'; height:'+h+';'">
                <img :src="l.url" class="img-fluid rounded" alt="l.name">
            </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination spot-white"></div>
    </div>
    `,
    props: ['list', 'w', 'h']
})













app.mount('#app')