myApp.controller('manageMovieController', ['$rootScope', '$scope', 'MovieService', '$state', function ($rootScope, $scope, MovieService, $state) {

    $scope.formStore = {}
    const id = $state.params.id;
    $scope.isAdminUser = !!$rootScope.isAdmin;
    $scope.idEdit = $state.params.id

    const loadImage = (element) => {
        if (element.files.length > 0 || element.files.length < 2) {
            const fileToLoad = element.files[0];
            const fileName = element.files[0].name;
            const fileReader = new FileReader();

            fileReader.onload = function (fileLoadedEvent) {
                const srcData = fileLoadedEvent.target.result;

                const newImage = document.createElement("img");
                newImage.src = srcData;
                $scope.formStore.link_image = srcData;
                
                MovieService.manageMovie({
                    img: $scope.formStore.link_image,
                    covername: fileName
                },).then(() => {
                    console.log('ok');
                }).catch((e) => {
                    console.log(e, 'encode');
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'an error ocurred',
                        showConfirmButton: false,
                        timer: 1500
                      })
                })

                document.getElementById("imgTest").innerHTML = newImage.outerHTML;
            };

            fileReader.readAsDataURL(fileToLoad);
        }
    };

    const createMovie = () => {
        console.log($scope.movieData);
        MovieService.manageMovie($scope.movieData,{
            img: $scope.formStore.link_image,
            covername: movieData /// DÚVIDA 
        })
        loadImage($scope.movieData)
        .then(({ data }) => {
            console.log('ok');
            console.log($scope.movieData);
            $state.go('all-movies')
        }).catch(e => {
            console.log(e, 'opa');
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
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    showConfirmButton: false,
                    timer: 1500
                })
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
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'an error ocurred',
                    showConfirmButton: false,
                    timer: 1500
                  })
            })
    }

    const editMovie = () => {
        MovieService.manageMovie($scope.movieData, id)
            .then((data) => {
                $state.go('all-movies')
            })
            .catch((e) => {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'an error ocurred',
                    showConfirmButton: false,
                    timer: 1500
                  })
            })

    }

    $scope.actionFunction = $state.params.id ? editMovie : createMovie
    init()
}])