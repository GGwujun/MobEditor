const fs = require('fs');
const path = require('path');
const rollup = require('rollup');
const pkg = require('../package.json');
const babel = require('rollup-plugin-babel');
const uglify = require('uglify-js');
const zlib = require('zlib');
const postcss = require('rollup-plugin-postcss');


const commonjs = require('rollup-plugin-commonjs');
const resolve = require('rollup-plugin-node-resolve');

const RELEASE_ROOT_PATH = 'dist';
const SOURCE_ROOT_PATH = 'src';
const EXAMPLE_PATH = 'example';
const RELEASE_FILE_NAME = pkg.name;
const SOURCE_ENTRY_FILE = `${SOURCE_ROOT_PATH}/index.js`;

if (!fs.existsSync(RELEASE_ROOT_PATH)) {
    fs.mkdirSync(RELEASE_ROOT_PATH);
}


function resolvePath(p) {
    return path.resolve(__dirname, '../', p);
}

const banner = ['/*!',
    ' * <%= pkg.name %> v<%= pkg.version %>',
    ' * (c) 2017-<%= date %> <%= pkg.author %>',
    ' * Released under the <%= pkg.license %> License.',
    ' * <%= pkg.homepage %>',
    ' */',
    '',
].join('\n').replace(/<%=\s([^%]+)\s%>/g, ($0, $1) => ($1 === 'date' ? new Date().getFullYear() : (pkg[$1.split('.')[1]] || '')));


const buildOptions = [{
    input: resolvePath(SOURCE_ENTRY_FILE),
    format: 'umd',
    output: {
        file: resolvePath(`${RELEASE_ROOT_PATH}/debug/${RELEASE_FILE_NAME}@rollup.js`),
        // 输出文件的umd必须要，否则watch监控失败
        format: 'umd',
    },
    name: 'mobeditor',
    plugins: [
        postcss({ extensions: ['.css'] }),
        babel({ exclude: 'node_modules/**' }),
        commonjs(),
        resolve({
            jsnext: true,
            main: true,
            browser: true
        })
    ],
    banner,
},
{
    input: resolvePath(SOURCE_ENTRY_FILE),
    format: 'umd',
    output: {
        file: resolvePath(`${EXAMPLE_PATH}/${RELEASE_FILE_NAME}@rollup.js`),
        // 输出文件的umd必须要，否则watch监控失败
        format: 'umd',
    },
    name: 'mobeditor',
    plugins: [
        postcss({ extensions: ['.css'] }),
        babel({ exclude: 'node_modules/**' }),
        commonjs(),
        resolve({
            jsnext: true,
            main: true,
            browser: true
        })
    ],
    banner,
},
{
    input: resolvePath(SOURCE_ENTRY_FILE),
    format: 'umd',
    output: {
        file: resolvePath(`${RELEASE_ROOT_PATH}/release/${RELEASE_FILE_NAME}@rollup.min.js`),
        // 输出文件的umd必须要，否则watch监控失败
        format: 'umd',
    },
    name: 'mobeditor',
    plugins: [
        postcss({ extensions: ['.css'] }),
        babel({ exclude: 'node_modules/**' }),
        commonjs(),
        resolve({
            jsnext: true,
            main: true,
            browser: true
        })
    ],
    banner,
}
];

module.exports.buildOptions = buildOptions;

function getSize(code) {
    return `${(code.length / 1024).toFixed(2)}kb`;
}

function blue(str) {
    return `\x1b[1m\x1b[34m${str}\x1b[39m\x1b[22m`;
}

function logError(e) {
    console.log(e);
}

function write(dest, code, zip) {
    return new Promise((resolve, reject) => {
        function report(extra) {
            console.log(`${blue(path.relative(process.cwd(), dest))} ${getSize(code)}${extra || ''}`);
            resolve();
        }

        fs.writeFile(dest, code, (err) => {
            if (err) {
                return reject(err);
            }
            if (zip) {
                zlib.gzip(code, (err2, zipped) => {
                    if (err2) {
                        return reject(err2);
                    }
                    report(` (gzipped: ${getSize(zipped)})`);

                    return resolve();
                });
            } else {
                report();
            }

            return resolve();
        });
    });
}

function buildEntry(config) {
    const dest = config.output.file;
    const isProd = /min\.js$/.test(dest);
    return rollup.rollup(config).then(bundle => bundle.generate(config)).then((res) => {
        if (isProd) {
            const minified = (config.banner ? config.banner : '') + uglify.minify(res.code, {
                output: {
                    ascii_only: true,
                },
                compress: {
                    pure_funcs: ['makeMap'],
                },
            }).code;
            return write(dest, minified);
        }
        return write(dest, res.code);
    }).catch(logError);
}


function walk(options) {
    let built = 0;
    const total = options.length;
    const next = () => {
        buildEntry(options[built]).then(() => {
            built += 1;
            if (built < total) {
                next();
            }
        }).catch(logError);
    };

    next();
}

walk(buildOptions);

module.exports.rebuild = () => {
    walk(buildOptions);
};
