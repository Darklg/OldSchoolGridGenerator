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
    if (tmp_gut_width) {
        $gutInput.value = tmp_gut_width;
    }
    var tmp_col_width = localStorage.getItem('col_width');
    if (tmp_col_width) {
        $colInput.value = tmp_col_width;
    }
    var tmp_nb_col = localStorage.getItem('nb_col');
    if (tmp_nb_col) {
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
            _tmp_i,
            _half_fract,
            _last_fract,
            _tmp_fract;

        _debug += '<h3>Detected grid</h3>';

        for (var _ver in _versions) {
            _tmp_fract = Math.floor(nb_col / _versions[_ver]);
            if (!_tmp_fract || _tmp_fract == _last_fract) {
                continue;
            }
            _tmp_val = ((col_width + gut_width) * _tmp_fract - gut_width);
            document.body.style.setProperty('--grid-size-' + _versions[_ver], _tmp_val + 'px');
            _debug += '<p>' + _tmp_fract + '/' + nb_col + ' : ' + _tmp_val + 'px</p>';

            /* Add intervals between full and half */
            if (_tmp_fract == nb_col) {
                _tmp_i = nb_col - 1;
                _half_fract = nb_col / 2;
                for (_tmp_i == nb_col; _tmp_i > _half_fract; _tmp_i--) {
                    _tmp_val = ((col_width + gut_width) * _tmp_i - gut_width);
                    _debug += '<p>' + _tmp_i + '/' + nb_col + ' : ' + _tmp_val + 'px</p>';
                }
            }
            _last_fract = _tmp_fract;
        }


        _debug += '<h3>Similar grids</h3>';


        /* Half */
        var _subgrid = [2, 3],
            _tmp_gut,
            _tmp_col,
            _tmp_nbcol;

        /* Double */
        _tmp_nbcol = Math.floor(nb_col / 2);
        _tmp_col = _tmp_val * 2 + gut_width;
        if (_tmp_nbcol > 1) {
            _debug += '<p data-set-values="' + _tmp_nbcol + ';' + _tmp_col + '">' + _tmp_nbcol + ' cols : ' + _tmp_col + 'px</p>';
        }

        for (var _sub in _subgrid) {
            _tmp_gut = gut_width * (_subgrid[_sub] - 1);
            _tmp_nbcol = nb_col * _subgrid[_sub];
            _tmp_col = Math.floor((_tmp_val - _tmp_gut) / _subgrid[_sub]);
            _debug += '<p data-set-values="' + _tmp_nbcol + ';' + _tmp_col + '">' + _tmp_nbcol + ' cols : ' + _tmp_col + 'px</p>';
        }

        _debug += '<h3>Reset</h3>';
        _tmp_nbcol = 12;
        _tmp_col = 90;
        _debug += '<p data-set-values="' + _tmp_nbcol + ';' + _tmp_col + '">' + _tmp_nbcol + ' cols : ' + _tmp_col + 'px</p>';


        document.body.style.setProperty('--grid-gut-width', gut_width + 'px');
        $debugInfos.innerHTML = _debug;
    }

    compute_values();
    $colInput.addEventListener('change', compute_values, 1);
    $gutInput.addEventListener('change', compute_values, 1);
    $nbcolInput.addEventListener('change', compute_values, 1);

    document.addEventListener('click', function(event) {
        if (event.target.matches('[data-set-values]')) {
            var values = event.target.getAttribute('data-set-values').split(';');
            $nbcolInput.value = values[0];
            $colInput.value = values[1];
            compute_values();
        }
    });

});
