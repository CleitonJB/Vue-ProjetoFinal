<template>
    <div class="page-content" :style="{ 'background-image': 'url(' + backgroundUrl + ')' }">
        <h1 title="Pressione 'f5' para uma nova experiência!">
            Seja bem-vindo(a)!
        </h1>

        <div class="photo-infos">
            <p>{{ location.name }}  <span>by</span> {{ user.name }}</p>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .page-content {
        position: absolute;

        width: 100vw;
        height: calc(100vh - 2.2rem);

        overflow: hidden;

        background-repeat: no-repeat;
        background-size: cover;

        display: flex;
        justify-content: center;
        align-items: flex-start;

        & > h1 {
            font-size: 5rem;
            text-shadow: 3px 5px 10px black;
            color: white;

            margin-top: 6rem;
        }
    }

    .photo-infos {
        position: absolute;
        bottom: 0;
        left: 0;

        padding: 0.7rem;

        & p {
            font-size: 0.7rem;
            color: #fff;
        }

        & p span {
            font-size: 0.6rem;
            color: rgb(145, 209, 180)
        }
    }
</style>

<script>
    import axios from "axios";

    export default {
        name: "Home",
        data: () => ({
            canSearch: true,
            location: {
                city:    "",
                country: "",
                name:    ""
            },
            user: {
                name:               "",
                instagram_username: ""
            },
            backgroundUrl: "https://images.unsplash.com/photo-1648737154547-b0dfd281c51e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMjUwNzd8MXwxfGFsbHwxfHx8fHx8Mnx8MTY1MTUyOTI2Mg&ixlib=rb-1.2.1&q=80&w=1920&h=1080"
        }),
        methods: {
            getPhoto() {
                if(!this.canSearch) return;

                const options = {
                    query:       "natural",
                    orientation: "landscape",
                    count: 1
                };

                axios.get(`https://api.unsplash.com/photos/random?client_id=8goub_thfJPBKwXu81ppBb5NYx8EFzs-Luj8BxDdLZA`, {
                    params: options
                })
                    .then((photoData) => {
                        if(!photoData) return;
                        // Local URL
                        this.backgroundUrl = photoData.data[0].urls.regular;

                        // Local data
                        this.location      = {
                            city:    photoData.data[0].location.city,
                            country: photoData.data[0].location.country,
                            name:    photoData.data[0].location.name
                        };

                        // User data
                        this.user = {
                            name:               photoData.data[0].user.name,
                            instagram_username: photoData.data[0].user.instagram_username
                        };
                    })
                    .catch((error) => {
                        alert(`Oh não! Acho que você excedeu o limite de requisições :/: \n ${error}`);

                        this.canSearch = false;

                        setTimeout(() => {
                            alert("Você já pode experimentar novas experiências!");
                            this.canSearch = true;
                        }, (1000 * 60 * 60));
                    });
            }
        },
        created() {
            this.getPhoto();
        }
    };
</script>
