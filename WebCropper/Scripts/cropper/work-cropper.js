$(function () {
    $("#imageContainerPlus").on('click', function () {
        var inputFile = $('<input/>')
            .attr('type', 'file')
            .attr('name', 'img_file')
            .attr('id', 'img_file')
            .attr('class', 'hide');

        $("#fileUploadContainer").html("");

        $("#fileUploadContainer")
            .html(inputFile);

        inputFile.click();

        inputFile.on('change', function () {
            if (this.files && this.files[0]) {
                if (this.files[0].type.match(/^image\//)) {
                    onLoadImage(this.files[0]);
                }
                else {
                    alert("Inavlid file type");
                }
            }
            else {
                alert("Please select the file");
            }
        });
    });

    var countX = 1;
    var countY = 1;
    function onLoadImage(fileName) {
        var $canvas = $('#canvas');
        var context = $canvas.get(0).getContext('2d');
        var reader = new FileReader();
        reader.onload = function (e) {
            var img = new Image();
            img.onload = function () {
                context.canvas.width = img.width;
                context.canvas.height = img.height;
                context.drawImage(img, 0, 0);
                var container = document.getElementById('containerCrop');
                container.style.display = "block";
                $canvas.cropper({
                    aspectRatio: 16 / 9,
                    crop: function (event) { }
                });
                var cropper = $canvas.data('cropper');
                $('#moveLeft').on('click', function () {
                    cropper.move(-10, 0);
                });
                $('#moveRight').on('click', function () {
                    cropper.move(10, 0);
                });
                $('#moveUp').on('click', function () {
                    cropper.move(0, 10);
                });
                $('#moveDown').on('click', function () {
                    cropper.move(0, -10);
                });
                $('#scaleX').on('click', function () {
                    cropper.scaleX(countX === 1 ? countX -= 2 : countX += 2);
                });
                $('#scaleY').on('click', function () {
                    cropper.scaleY(countY === 1 ? countY -= 2 : countY += 2);
                });
                $('#moveDown').on('click', function () {
                    cropper.move(0, -10);
                });
                $('#rotateLeft').on('click', function () {
                    cropper.rotate(-45);
                });
                $('#rotateRight').on('click', function () {
                    cropper.rotate(45);
                });
                $('#zoomPlus').on('click', function () {
                    cropper.zoom(0.1);
                });
                $('#zoomMinus').on('click', function () {
                    cropper.zoom(-0.1);
                });
                $('#dragModeMove').on('click', function () {
                    cropper.setDragMode("move");
                });
                $('#dragModeCrop').on('click', function () {
                    cropper.setDragMode("crop");
                });
                $('#crop').on('click', function () {
                    $('#img-preview').html(cropper.getCroppedCanvas());
                });
            };
            img.src = e.target.result;
        }
        reader.readAsDataURL(fileName);
    }



   
});