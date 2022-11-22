myApp.controller('manageMovieController', ['$rootScope', '$scope', 'MovieService', '$state', function ($rootScope, $scope, MovieService, $state) {

    $scope.formStore = {}
    const id = $state.params.id;
    $scope.isAdminUser = !!$rootScope.isAdmin;
    $scope.idEdit = $state.params.id

    $scope.encodeImageFileAsURL = function (element) {
        if (element.files.length > 0 || element.files.length < 2) {
            const fileToLoad = element.files[0];
            const fileName = element.files[0].name;
            const fileReader = new FileReader();

            fileReader.onload = function (fileLoadedEvent) {
                const srcData = fileLoadedEvent.target.result;

                const newImage = document.createElement("img");
                newImage.src = srcData;
                $scope.formStore.link_image = srcData;
                
                MovieService.addCover({
                    img: $scope.formStore.link_image,
                    name: fileName
                }, $state.params.id).then(() => {
                    
                }).catch(error => console.log(error))

                document.getElementById("imgTest").innerHTML = newImage.outerHTML;
            };

            fileReader.readAsDataURL(fileToLoad);
        }
    };



    const init = () => {
        $scope.title = $state.params.id ? 'Edit a movie' : 'Add a movie';
        if ($state.params.id) {
            showMovie()
        }
    }

    const showMovie = () => {
        MovieService.showMovie(id)
            .then((resp) => {
                $scope.movieData = resp.data
        
            })
            .catch((e) => {
                console.log(e);
            })
    }



    const createMovie = () => {
        
        MovieService.manageMovie($scope.movieData).then(({ data }) => {
            $state.go('update-movie', {
                id: data.id
            })
        }).catch(e => {
            const confirmation = Swal.fire({
                title: 'dados inválidos',
                icon: 'error',
                confirmButtonColor: '#04052e',
                timer: 500
            });
            if (!confirmation.isConfirmed) {
                return;
            }
        })
    }

    const createCover = (data) => {
        MovieService.addCover(data, id)
            .then(() => {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'movie created',
                    showConfirmButton: false,
                    timer: 1000
                })
                $state.go('all-movies')
            }).catch((e) => {
                console.log(e);
            })
    }

    const editMovie = () => {
        MovieService.manageMovie($scope.movieData, id)
            .then((data) => {
                $state.go('all-movies')
            })
            .catch((e) => {
                console.log(e);
            })

    }

    $scope.actionFunction = $state.params.id ? editMovie : createMovie
    init()
}])