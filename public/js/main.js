let main = new Vue({
    el: '#app',
    data: {
        entries: []
    },
    created () {
        this.fetchData()
    },
    methods: {
        fetchData() {
            axios.get('https://discovered-hiss.glitch.me/api/get/10')
                .then((res) => {
                    this.entries = res.data;
                })
                .catch((err) => console.error(err))
        }
    }
});
