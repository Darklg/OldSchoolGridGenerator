document.addEventListener("DOMContentLoaded", function() {
    'use strict';
    var $colInput = document.getElementById('column_width'),
        $gutInput = document.getElementById('gutter_width'),
        $nbcolInput = document.getElementById('nb_col'),
        $debugInfos = document.getElementById('debug-infos'),
        gut_width = 0,
        col_width = 0,
        nb_col = 0;



    var tmp_gut_width = localStorage.getItem('gut_width');
    if(tmp_gut_width){
        $gutInput.value = tmp_gut_width;
    }
    var tmp_col_width = localStorage.getItem('col_width');
if(tmp_col_width){
    $colInput.value = tmp_col_width;
}
    var tmp_nb_col = localStorage.getItem('nb_col');
if(tmp_nb_col){
    $nbcolInput.value = tmp_nb_col;
}

    function compute_values() {
        gut_width = parseInt($gutInput.value, 10);
        col_width = parseInt($colInput.value, 10);
        nb_col = parseInt($nbcolInput.value, 10);

        localStorage.setItem('gut_width', gut_width);
        localStorage.setItem('col_width', col_width);
        localStorage.setItem('nb_col', nb_col);

        var _debug = '';
        var _versions = [1, 2, 3, 4],
            _tmp_val,
            _tmp_fract;
        for (var _ver in _versions) {
            _tmp_fract = Math.floor(nb_col / _versions[_ver]);
            _tmp_val = ((col_width + gut_width) * _tmp_fract - gut_width);
            document.body.style.setProperty('--grid-size-' + _versions[_ver], _tmp_val + 'px');
            _debug += '<p>' + _tmp_fract + '/' + nb_col + ' : ' + _tmp_val + 'px</p>';
        }

        document.body.style.setProperty('--grid-gut-width', gut_width + 'px');
        $debugInfos.innerHTML = _debug;
    }

    compute_values();
    $colInput.addEventListener('change', compute_values, 1);
    $gutInput.addEventListener('change', compute_values, 1);
    $nbcolInput.addEventListener('change', compute_values, 1);

});
