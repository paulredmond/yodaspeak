$(document).ready(function () {

    function Loader(target) {
        this.target = document.getElementById(target);
        this.spinner = new Spinner()
    };

    Loader.prototype.show = function () {
        this.spinner.spin(this.target);
    }

    Loader.prototype.hide = function () {
        this.spinner.stop();
    }

    var spinner = new Loader('loading');

    $('#yoda-translator-form').on('submit', function (event) {
        var self = this;
        event.preventDefault();
        spinner.show();
        $(self).hide();
        $.ajax({
            url: '/yodaspeak',
            type: 'GET',
            data: $(self).serialize(),
            success: function (data) {
                spinner.hide();
                $(self)
                    .find("input[type=text]")
                    .val("")
                ;
                $(self).show();
                $(self).find('input[name=say]').focus();
                $('#yoda-translations').append('<dt>' + data.sentance + '</dt><dd>' + data.yodaspeak + '</dd>');
            }
        })
    })

});
