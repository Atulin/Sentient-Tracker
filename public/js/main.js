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
            axios.get('/api/get/10')
                .then((res) => {
                    this.entries = res.data;
                })
                .catch((err) => console.error(err))
        }
    }
});
