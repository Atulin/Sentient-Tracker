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
            axios.get('http://155.138.228.215:8080/api/get/10')
                .then((res) => {
                    this.entries = res.data;
                })
                .catch((err) => console.error(err))
        }
    }
});
