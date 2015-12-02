/*! LAB.js (LABjs :: Loading And Blocking JavaScript)
    v2.0.3 (c) Kyle Simpson
    MIT License
*/
(function(o) {
    var K = o.$LAB,
        y = "UseLocalXHR",
        z = "AlwaysPreserveOrder",
        u = "AllowDuplicates",
        A = "CacheBust",
        B = "BasePath",
        C = /^[^?#]*\//.exec(location.href)[0],
        D = /^\w+\:\/\/\/?[^\/]+/.exec(C)[0],
        i = document.head || document.getElementsByTagName("head"),
        L = (o.opera && Object.prototype.toString.call(o.opera) == "[object Opera]") || ("MozAppearance" in document.documentElement.style),
        q = document.createElement("script"),
        E = typeof q.preload == "boolean",
        r = E || (q.readyState && q.readyState == "uninitialized"),
        F = !r && q.async === true,
        M = !r && !F && !L;

    function G(a) {
        return Object.prototype.toString.call(a) == "[object Function]"
    }

    function H(a) {
        return Object.prototype.toString.call(a) == "[object Array]"
    }

    function N(a, c) {
        var b = /^\w+\:\/\//;
        if (/^\/\/\/?/.test(a)) {
            a = location.protocol + a
        } else if (!b.test(a) && a.charAt(0) != "/") {
            a = (c || "") + a
        }
        return b.test(a) ? a : ((a.charAt(0) == "/" ? D : C) + a)
    }

    function s(a, c) {
        for (var b in a) {
            if (a.hasOwnProperty(b)) {
                c[b] = a[b]
            }
        }
        return c
    }

    function O(a) {
        var c = false;
        for (var b = 0; b < a.scripts.length; b++) {
            if (a.scripts[b].ready && a.scripts[b].exec_trigger) {
                c = true;
                a.scripts[b].exec_trigger();
                a.scripts[b].exec_trigger = null
            }
        }
        return c
    }

    function t(a, c, b, d) {
        a.onload = a.onreadystatechange = function() {
            if ((a.readyState && a.readyState != "complete" && a.readyState != "loaded") || c[b]) return;
            a.onload = a.onreadystatechange = null;
            d()
        }
    }

    function I(a) {
        a.ready = a.finished = true;
        for (var c = 0; c < a.finished_listeners.length; c++) {
            a.finished_listeners[c]()
        }
        a.ready_listeners = [];
        a.finished_listeners = []
    }

    function P(d, f, e, g, h) {
        setTimeout(function() {
            var a, c = f.real_src,
                b;
            if ("item" in i) {
                if (!i[0]) {
                    setTimeout(arguments.callee, 25);
                    return
                }
                i = i[0]
            }
            a = document.createElement("script");
            if (f.type) a.type = f.type;
            if (f.charset) a.charset = f.charset;
            if (h) {
                if (r) {
                    e.elem = a;
                    if (E) {
                        a.preload = true;
                        a.onpreload = g
                    } else {
                        a.onreadystatechange = function() {
                            if (a.readyState == "loaded") g()
                        }
                    }
                    a.src = c
                } else if (h && c.indexOf(D) == 0 && d[y]) {
                    b = new XMLHttpRequest();
                    b.onreadystatechange = function() {
                        if (b.readyState == 4) {
                            b.onreadystatechange = function() {};
                            e.text = b.responseText + "\n//@ sourceURL=" + c;
                            g()
                        }
                    };
                    b.open("GET", c);
                    b.send()
                } else {
                    a.type = "text/cache-script";
                    t(a, e, "ready", function() {
                        i.removeChild(a);
                        g()
                    });
                    a.src = c;
                    i.insertBefore(a, i.firstChild)
                }
            } else if (F) {
                a.async = false;
                t(a, e, "finished", g);
                a.src = c;
                i.insertBefore(a, i.firstChild)
            } else {
                t(a, e, "finished", g);
                a.src = c;
                i.insertBefore(a, i.firstChild)
            }
        }, 0)
    }

    function J() {
        var l = {},
            Q = r || M,
            n = [],
            p = {},
            m;
        l[y] = true;
        l[z] = false;
        l[u] = false;
        l[A] = false;
        l[B] = "";

        function R(a, c, b) {
            var d;

            function f() {
                if (d != null) {
                    d = null;
                    I(b)
                }
            }
            if (p[c.src].finished) return;
            if (!a[u]) p[c.src].finished = true;
            d = b.elem || document.createElement("script");
            if (c.type) d.type = c.type;
            if (c.charset) d.charset = c.charset;
            t(d, b, "finished", f);
            if (b.elem) {
                b.elem = null
            } else if (b.text) {
                d.onload = d.onreadystatechange = null;
                d.text = b.text
            } else {
                d.src = c.real_src
            }
            i.insertBefore(d, i.firstChild);
            if (b.text) {
                f()
            }
        }

        function S(c, b, d, f) {
            var e, g, h = function() {
                    b.ready_cb(b, function() {
                        R(c, b, e)
                    })
                },
                j = function() {
                    b.finished_cb(b, d)
                };
            b.src = N(b.src, c[B]);
            b.real_src = b.src + (c[A] ? ((/\?.*$/.test(b.src) ? "&_" : "?_") + ~~(Math.random() * 1E9) + "=") : "");
            if (!p[b.src]) p[b.src] = {
                items: [],
                finished: false
            };
            g = p[b.src].items;
            if (c[u] || g.length == 0) {
                e = g[g.length] = {
                    ready: false,
                    finished: false,
                    ready_listeners: [h],
                    finished_listeners: [j]
                };
                P(c, b, e, ((f) ? function() {
                    e.ready = true;
                    for (var a = 0; a < e.ready_listeners.length; a++) {
                        e.ready_listeners[a]()
                    }
                    e.ready_listeners = []
                } : function() {
                    I(e)
                }), f)
            } else {
                e = g[0];
                if (e.finished) {
                    j()
                } else {
                    e.finished_listeners.push(j)
                }
            }
        }

        function v() {
            var e, g = s(l, {}),
                h = [],
                j = 0,
                w = false,
                k;

            function T(a, c) {
                a.ready = true;
                a.exec_trigger = c;
                x()
            }

            function U(a, c) {
                a.ready = a.finished = true;
                a.exec_trigger = null;
                for (var b = 0; b < c.scripts.length; b++) {
                    if (!c.scripts[b].finished) return
                }
                c.finished = true;
                x()
            }

            function x() {
                while (j < h.length) {
                    if (G(h[j])) {
                        try {
                            h[j++]()
                        } catch (err) {}
                        continue
                    } else if (!h[j].finished) {
                        if (O(h[j])) continue;
                        break
                    }
                    j++
                }
                if (j == h.length) {
                    w = false;
                    k = false
                }
            }

            function V() {
                if (!k || !k.scripts) {
                    h.push(k = {
                        scripts: [],
                        finished: true
                    })
                }
            }
            e = {
                script: function() {
                    for (var f = 0; f < arguments.length; f++) {
                        (function(a, c) {
                            var b;
                            if (!H(a)) {
                                c = [a]
                            }
                            for (var d = 0; d < c.length; d++) {
                                V();
                                a = c[d];
                                if (G(a)) a = a();
                                if (!a) continue;
                                if (H(a)) {
                                    b = [].slice.call(a);
                                    b.unshift(d, 1);
                                    [].splice.apply(c, b);
                                    d--;
                                    continue
                                }
                                if (typeof a == "string") a = {
                                    src: a
                                };
                                a = s(a, {
                                    ready: false,
                                    ready_cb: T,
                                    finished: false,
                                    finished_cb: U
                                });
                                k.finished = false;
                                k.scripts.push(a);
                                S(g, a, k, (Q && w));
                                w = true;
                                if (g[z]) e.wait()
                            }
                        })(arguments[f], arguments[f])
                    }
                    return e
                },
                wait: function() {
                    if (arguments.length > 0) {
                        for (var a = 0; a < arguments.length; a++) {
                            h.push(arguments[a])
                        }
                        k = h[h.length - 1]
                    } else k = false;
                    x();
                    return e
                }
            };
            return {
                script: e.script,
                wait: e.wait,
                setOptions: function(a) {
                    s(a, g);
                    return e
                }
            }
        }
        m = {
            setGlobalDefaults: function(a) {
                s(a, l);
                return m
            },
            setOptions: function() {
                return v().setOptions.apply(null, arguments)
            },
            script: function() {
                return v().script.apply(null, arguments)
            },
            wait: function() {
                return v().wait.apply(null, arguments)
            },
            queueScript: function() {
                n[n.length] = {
                    type: "script",
                    args: [].slice.call(arguments)
                };
                return m
            },
            queueWait: function() {
                n[n.length] = {
                    type: "wait",
                    args: [].slice.call(arguments)
                };
                return m
            },
            runQueue: function() {
                var a = m,
                    c = n.length,
                    b = c,
                    d;
                for (; --b >= 0;) {
                    d = n.shift();
                    a = a[d.type].apply(null, d.args)
                }
                return a
            },
            noConflict: function() {
                o.$LAB = K;
                return m
            },
            sandbox: function() {
                return J()
            }
        };
        return m
    }
    o.$LAB = J();
    (function(a, c, b) {
        if (document.readyState == null && document[a]) {
            document.readyState = "loading";
            document[a](c, b = function() {
                document.removeEventListener(c, b, false);
                document.readyState = "complete"
            }, false)
        }
    })("addEventListener", "DOMContentLoaded")
})(this);
/* Dynamically Load JS assets via LABjs
 * There are two groups of assets:
 * 1. Those based on markup_id, that is, on the page type
 * 2. Those based on need for polyfills, that is, usually for IE
 */
;
(function(global, $, TOH) {
    $LAB
        .script(['http://img2.timeinc.net/toh/static/r/j/tohLib-min.js', 'http://img2.timeinc.net/toh/static/r/j/toh-core-no-load-min.js']).wait(function() {
            //TOH.log(["TOH core loaded", TOH.timestamp(), 's'].join(' '));

            var id = THISOLDHOUSE.markup_id.stringify('_', ['content', 'page'])
                //// Build script queues for each markup id
                // JS Library Resources
                ,
                bc_lib = 'http://admin.brightcove.com/js/BrightcoveExperiences.js',
                bc_ad_lib = 'http://www.thisoldhouse.com/toh/static/j/VideoAdLoader.js',
                episode_lib = 'http://img2.timeinc.net/toh/static/r/j/toh-episodes-min.js',
                date_format_lib = 'http://img2.timeinc.net/toh/static/r/j/toh-strftime-min.js',
                icanhaz_lib = 'http://img2.timeinc.net/toh/static/r/j/icanhaz-min.js',
                comments_lib = 'http://img2.timeinc.net/toh/static/r/j/toh-comments-min.js',
                lightbox_lib = 'http://cdn.jquerytools.org/1.2.7/all/jquery.tools.min.js',
                gallery_lib = 'http://img2.timeinc.net/toh/static/r/j/toh-gallery-min.js',
                home_lib = 'http://img2.timeinc.net/toh/static/r/j/toh-home-min.js',
                video_dir_lib = 'http://img2.timeinc.net/toh/static/r/j/toh-videos-min.js',
                covers_lib = 'http://img2.timeinc.net/toh/static/r/j/toh-covers-min.js',
                webcams_lib = 'http://img2.timeinc.net/toh/static/r/j/toh-webcams-min.js',
                project_slider_lib = 'http://img2.timeinc.net/toh/static/r/j/toh-projects-min.js',
                project_resources_lib = 'http://img2.timeinc.net/toh/static/r/j/toh-project-resources-min.js',
                tv_schedule_lib = 'http://img2.timeinc.net/toh/static/r/j/toh-tv-schedule-min.js',
                discussions_lib = 'http://img2.timeinc.net/toh/static/r/j/toh-discussions-min.js',
                no_placeholder_lib = 'http://img2.timeinc.net/toh/static/r/j/jquery-placeholder-2.0-min.js',
                no_boxshadow_lib = 'http://cdnjs.cloudflare.com/ajax/libs/css3pie/1.0.0/PIE.js',
                ucs_remodel_lib = 'http://img2.timeinc.net/toh/static/r/j/toh-ucs-remodel.js',
                ucs_tips_lib = 'http://img2.timeinc.net/toh/static/r/j/toh-ucs-tips.js',
                ucs_remodel_gallery_lib = 'http://img2.timeinc.net/toh/static/r/j/toh-ucs-remodel-gallery.js',
                ucs_diy_gallery_lib = 'http://img2.timeinc.net/toh/static/r/j/toh-ucs-diy-gallery.js',
                ucs_tips_gallery_lib = 'http://img2.timeinc.net/toh/static/r/j/toh-ucs-tips-gallery.js'

            // Script Queues
            , pressroom_tv_queue = [no_placeholder_lib], comments_queue = [icanhaz_lib, date_format_lib, comments_lib], video_queue = [bc_lib, bc_ad_lib, video_dir_lib], proj_queue = [icanhaz_lib, project_slider_lib], video_short_queue = video_queue.concat(comments_queue, lightbox_lib), video_episode_queue = video_queue.concat(episode_lib, proj_queue), gallery_queue = comments_queue.concat(gallery_lib), proj_webcams_queue = proj_queue.concat(date_format_lib, webcams_lib), proj_overview_queue = proj_queue.concat(lightbox_lib, tv_schedule_lib, project_resources_lib, discussions_lib), steps_queue = comments_queue.concat(lightbox_lib), article_queue = comments_queue.concat(lightbox_lib), tv_overview_queue = proj_queue.concat(tv_schedule_lib), ucs_remodel_gallery_queue = [icanhaz_lib, ucs_remodel_lib, ucs_remodel_gallery_lib], ucs_diy_gallery_queue = [icanhaz_lib, ucs_tips_lib, ucs_diy_gallery_lib], ucs_tips_gallery_queue = [icanhaz_lib, ucs_tips_lib, ucs_tips_gallery_lib]

            // ID to Script Queue Map
            , id_script_map = {
                contestPage_contestPageForm: [],
                ucs_remodel_2013_gallery_2013: [],
                ucs_yoh_diy_2013_gallery_2013: [],
                video_short: video_short_queue,
                pressroom_tv: pressroom_tv_queue,
                video_episode: video_episode_queue,
                home_home: [home_lib],
                gallery_slide: gallery_queue,
                gallery_thumbnails: gallery_queue,
                gallery_last: gallery_queue,
                project_project: proj_queue,
                project_webcams: proj_webcams_queue,
                project_overview: proj_overview_queue,
                tohtv_overview: tv_overview_queue,
                tohtv_schedule: [tv_schedule_lib],
                tohtv_tohtv: [],
                asktohtv_asktohtv: [],
                asktohtv_about: [tv_schedule_lib],
                asktohtv_schedule: [tv_schedule_lib],
                adslide_adslide: [],
                steps_step: steps_queue,
                steps_last: comments_queue,
                section_section: [icanhaz_lib, discussions_lib],
                section_magazine: [icanhaz_lib, covers_lib],
                section_contest: [],
                special_special: [],
                article_article: article_queue,
                ucs_remodel_2013_gallery: ucs_remodel_gallery_queue,
                ucs_yoh_diy_2013_gallery: ucs_diy_gallery_queue,
                ucs_yoh_tips_gallery: ucs_tips_gallery_queue,
                ucs_yoh_save_gallery: ucs_tips_gallery_queue
            }

            //// Build init scripts for each markup id requiring one
            // Initialization functions
            , lightbox_init = function() {
                $('.lbx-link').overlay({
                    mask: {
                        color: '#000',
                        loadSpeed: 200,
                        opacity: 0.5
                    },
                    fixed: false,
                    left: 'center',
                    close: '.nav-close'
                });
            }, accordion_init = function() {
                $('.accordion-module').tabs('.accordion-panel', {
                    tabs: '.tab',
                    effect: 'slide',
                    initialIndex: 0,
                    current: 'is-selected'
                });
            }, brightcove_init = function() {
                brightcove.createExperiences();
            }, comments_init = function() {
                jQuery('.mod-comments').toh_core('comments_init');
            }, social_sidebar_init = function() {
                var site_config = TOH.social_sidebar_config,
                    page_config = TOH.page_context.sidebar_config || {};

                if (!page_config) {
                    return;
                }
                $.extend(true, site_config, page_config);
                $('.social-sidebar').toh_core('social_sidebar', site_config);
            }

            // ID to Initialization Map
            , id_init_map = {
                video_short: function() {
                    brightcove_init();
                    comments_init();
                    lightbox_init();
                },
                video_episode: function() {
                    brightcove_init();
                },
                article_article: function() {
                    accordion_init();
                    comments_init()
                    lightbox_init();
                },
                project_overview: function() {
                    accordion_init();
                },
                steps_step: function() {
                    accordion_init();
                    comments_init();
                    lightbox_init();
                },
                gallery_slide: function() {
                    comments_init();
                },
                gallery_last: function() {
                    comments_init();
                },
                gallery_thumbnails: function() {
                    comments_init();
                }
            }

            // Polyfill Initialziation Map
            , polyfill_init_map = {
                no_boxshadow: function() {
                    if (window.PIE) {
                        $('.social-sidebar').each(function() {
                            PIE.attach(this);
                        });
                        $('.single-tab-panel').each(function() {
                            PIE.attach(this);
                        });
                        $('#home-dl .tab:eq(0)').each(function() {
                            PIE.attach(this);
                        });
                        $('#home-dl').on('click, switch', '.tab', function() {
                            PIE.attach(this);
                        });
                    }
                }
            }

            // Add polyfill scripts if needed
            , get_polyfill_queue = function() {
                var queue = [];
                if (!Modernizr['placeholder']) {
                    queue.push(no_placeholder_lib);
                }
                if (!Modernizr['boxshadow']) {
                    queue.push(no_boxshadow_lib);
                }
                return queue;
            }

            // Add polyfill inits if needed
            , get_polyfill_inits = function() {
                var inits = [],
                    boxshadow = 'boxshadow';
                if (!Modernizr[boxshadow]) {
                    inits.push(['no', boxshadow].join('_'));
                }
                return inits;
            }

            // Execute initializations in jQuery doc-ready context
            , init_on_ready = function(id, poly_inits) {
                var id_init = function() {
                        if (id in id_init_map) {
                            id_init_map[id]();
                        }
                    },
                    polyfill_init = function() {
                        var polyfill, len = poly_inits.length;

                        for (var p = 0; p < len; p += 1) {
                            polyfill = poly_inits[p];
                            if (polyfill in polyfill_init_map) {
                                polyfill_init_map[polyfill]();
                            }
                        }
                    };
                // jQuery Document-Ready context
                jQuery(function() {
                    id_init();
                    polyfill_init();
                    social_sidebar_init();
                });
            };
            $LAB
            // Build script queue for this page
                .queueScript(function() {
                    var poly_queue = get_polyfill_queue();
                    return id_script_map[id].concat(poly_queue);
                })
                // Build inits for this page
                .queueWait(function() {
                    var poly_inits = get_polyfill_inits();
                    init_on_ready(id, poly_inits);
                });
            // Load scripts and run inits
            $LAB.runQueue();
        });
})(window, jQuery, THISOLDHOUSE);