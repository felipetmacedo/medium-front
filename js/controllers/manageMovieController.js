myApp.controller("manageMovieController", [
  "$rootScope",
  "$scope",
  "MovieService",
  "$state",
  function ($rootScope, $scope, MovieService, $state) {
    $scope.movieData = {};
    const id = $state.params.id;
    $scope.isAdminUser = !!$rootScope.isAdmin;
    $scope.idEdit = $state.params.id;

    $scope.loadImage = function (element) {
      console.log(element, "element");
      console.log(element.files, "files");
      if (element.files.length > 0 || element.files.length < 2) {
        const fileToLoad = element.files[0];
        const fileName = `${Date.now() * Math.random()}.png`;
        const fileReader = new FileReader();

        fileReader.onload = function (fileLoadedEvent) {
          const srcData = fileLoadedEvent.target.result;

          const newImage = document.createElement("img");
          newImage.src = srcData;
          $scope.movieData.img = srcData;
          $scope.movieData.covername = fileName;

          console.log(fileName, "fileName");

          document.getElementById("imgTest").innerHTML = newImage.outerHTML;
        };

        fileReader.readAsDataURL(fileToLoad);
      }
    };

    const createMovie = () => {
      MovieService.manageMovie($scope.movieData)
        .then(() => {
          console.log("ok");
          console.log($scope.movieData);
          $state.go("all-movies");
        })
        .catch((e) => {
          console.log(e, "opa");
          const confirmation = Swal.fire({
            title: "dados inválidos",
            icon: "error",
            confirmButtonColor: "#04052e",
            timer: 500,
          });
          if (!confirmation.isConfirmed) {
            return;
          }
        });
    };

    const init = () => {
      if (!$scope.isAdminUser) {
        Swal.fire({
          position: "center",
          icon: "error",
          showConfirmButton: false,
          timer: 1500,
        });
        $state.go("all-movies");
        return;
      }
      $scope.title = $state.params.id ? "Edit a movie" : "Add a movie";
      if ($state.params.id) {
        showMovie();
      }
    };

    const showMovie = () => {
      MovieService.showMovie(id)
        .then((resp) => {
          $scope.movieData = resp.data;
        })
        .catch((e) => {
          Swal.fire({
            position: "center",
            icon: "error",
            showConfirmButton: false,
            timer: 1500,
          });
        });
    };

    const createCover = (data) => {
      MovieService.addCover(data, id)
        .then(() => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "movie created",
            showConfirmButton: false,
            timer: 1000,
          });
          $state.go("all-movies");
        })
        .catch((e) => {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "an error ocurred",
            showConfirmButton: false,
            timer: 1500,
          });
        });
    };

    const editMovie = () => {
      MovieService.manageMovie($scope.movieData, id)
        .then((data) => {
          $state.go("all-movies");
        })
        .catch((e) => {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "an error ocurred",
            showConfirmButton: false,
            timer: 1500,
          });
        });
    };

    const logOut = () => {
      Swal.fire({
        title: "log out?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "yes",
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.clear();
        }
      });
    };

    $scope.logOut = logOut;
    $scope.actionFunction = $state.params.id ? editMovie : createMovie;
    init();
  },
]);
