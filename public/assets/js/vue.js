var app = Vue.createApp({
    data() {
        return {
            company: 'AMIT',
            // send a message form
            message:'',
            subject:'',
            username:'',
            useremail:'',
            draftMessage:`${this.message} <br> <hr> <br> <h4>USER : ${this.username} | EMAIL : ${this.useremail} </h4>`,


            profile: {
                heading: 'Welcome to [BRAND-NAME]',
                bio: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Amet quod quidem, ipsa ratione nostrum nemo excepturi harum earum. Quia illo ab exercitationem sed beatae non perspiciatis, quidem deserunt alias adipisci!',
                // ABOUT 
                about1: '',
                about2: '',
                check1: '',
                check2: '',
                check3: '',
                learnMoreBtn: '',
                c1: '',
                c2: '',
                c3: '',
                // TABS
                tabs: ['EVENTS', 'MOMENTS', 'FESTIVAL'],
                // SERVICES
                services: [
                    { id: '', index: '', title: '', info: '', url: '' },
                ],
                // MEDIA
                media: {
                    EVENTS: [
                        { id: 'EVENT-1', index: '1', title: 'EVENT 1', info: 'EVENT INFO 1', url: 'https://picsum.photos/2880/1620' },
                        { id: 'EVENT-2', index: '2', title: 'EVENT 2', info: 'EVENT INFO 2', url: 'https://picsum.photos/2880/1620' },
                        { id: 'EVENT-3', index: '3', title: 'EVENT 3', info: 'EVENT INFO 3', url: 'https://picsum.photos/2880/1620' },
                        { id: 'EVENT-4', index: '4', title: 'EVENT 4', info: 'EVENT INFO 4', url: 'https://picsum.photos/2880/1620' },
                    ],
                    MOMENTS: [
                        { id: 'MOMENTS-1', index: '1', title: 'MOMENT 1', info: 'MOMENTS INFO 1', url: 'https://picsum.photos/2880/1620' },
                        { id: 'MOMENTS-2', index: '2', title: 'MOMENT 2', info: 'MOMENTS INFO 2', url: 'https://picsum.photos/2880/1620' },
                    ],
                    FESTIVAL: [
                        { id: 'FEST-1', index: '1', title: 'FESTIVAL 1', info: 'FESTIVAL INFO 1', url: 'https://picsum.photos/2880/1620' },
                    ],
                },
                // TEAM
                team: [
                    { id: '', index: '', title: '', info: '', url: '' },
                ],
                // FAQ
                faq: [
                    { id: 'faq-1', index: '1', title: 'Question 1', info: 'Answer 1' },
                    { id: 'faq-2', index: '2', title: 'Question 2', info: 'Answer 2' },
                    { id: 'faq-3', index: '3', title: 'Question 3', info: 'Answer 3' },
                    { id: 'faq-4', index: '4', title: 'Question 4', info: 'Answer 4' },
                ],
                // CONTACT
                email: 'info@lebancode.com',
                number: '',
                address: '',
                twitter: '',
                instagram: '',
                facebook: '',
                linkedin: '',
                whatsapp: ''

            },
            currentTab: '',
            currentList: '',
        }
    },
    methods: {

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
        this.getAllMedia()

        // console.log(this.currentList)
    }
})


app.component('card', {
    template:
        /*html*/
        `
        <!-- P O T  -->
        <div class="card-pot my-3" :style="'width: '+width+'px;'">

            <div class="shadow bg-light rounded scale-in-center">
                <!-- customized ratio control -->
                <img :src="url" :alt="imgAlt" class="img-fluid rounded-top">
                <div class="card-body d-flex justify-content-between align-items-center p-3">
                    <h5 class="lh-base ls-2">{{title}}</h5>
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

app.component('swiper',{
    template:
    /*html*/
    `
    <!-- Swiper -->
    <div class="swiper">
        <div class="swiper-wrapper">
            <div v-for="l in list" class="swiper-slide " :style="'width:'+w+'; height:'+h+';'">
                <img :src="l" class="img-fluid rounded">
            </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination spot-white"></div>
    </div>
    `,
    props:['list','w','h']
})














app.mount('#app')