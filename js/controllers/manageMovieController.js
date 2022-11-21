myApp.controller('manageMovieController', ['$rootScope', '$scope', 'MovieService', '$state', function ($rootScope, $scope, MovieService, $state) {

    const id = $state.params.id;
    $scope.isAdminUser = !!$rootScope.isAdmin;

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
                console.log(id);
                console.log($scope.movieData);
            })
            .catch((e) => {
                console.log(e);
            })
    }

    const openSwal = fileParams => {
        Swal.fire({
            title: 'Select image',
            input: 'file',
            inputAttributes: {
                'accept': 'image/*',
                'aria-label': 'Upload your profile picture'
            },
        }).then(file => {
            console.log(file, 'file')
            if (file) {
                const reader = new FileReader()

                MovieService.addCover(file.value, fileParams).then(() => {
                    Swal.fire({
                        title: 'Your uploaded picture',
                        imageUrl: file.target.result,
                        imageAlt: 'The uploaded picture'
                    })
                }).catch(error => {
                    console.log(reader, 'reader');
                    console.log(JSON.stringify(file, null, 4))
                    console.log(file);
                    console.log('OPAAA');
                    console.log(error)
                })
                reader.onload = (e) => {
                    const srcData = e.target.result;
                    console.log(srcData, 'srcData')
                    newImage.src = srcData;
                    $scope.formCar.img = srcData;

                    console.log(e, 'E')
                    reader.readAsDataURL(file)
                    console.log(data, 'data')
                }
            }
        })
    }

    const createMovie = () => {
        console.log('criou')
        MovieService.manageMovie($scope.movieData).then(resp => {
            openSwal(resp.data.id)
        }).catch(e => {
            // console.log(e, 'err9r');
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
                console.log(data);
                $state.go('all-movies')
            })
            .catch((e) => {
                console.log(e);
            })

    }

    $scope.actionFunction = $state.params.id ? editMovie : createMovie
    init()
}])