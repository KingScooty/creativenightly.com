(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
;__browserify_shim_require__=require;(function browserifyShim(module, exports, require, define, browserify_shim__define__module__export__) {
/**
 * 
 * jquery-pjax
 * 
 * @name jquery-pjax
 * @version 2.34.2
 * ---
 * @author falsandtru https://github.com/falsandtru/jquery-pjax
 * @copyright 2012, falsandtru
 * @license MIT
 * 
 */

!new function(window, document, undefined, $) {
"use strict";
/// <reference path=".d/jquery.d.ts"/>
/// <reference path=".d/jquery.pjax.d.ts"/>
var MODULE;
(function (MODULE) {
    var DEF;
    (function (DEF) {
        DEF.NAME = 'pjax';
        DEF.NAMESPACE = jQuery;
    })(DEF = MODULE.DEF || (MODULE.DEF = {}));
})(MODULE || (MODULE = {}));
var MODULE;
(function (MODULE) {
    // State
    (function (State) {
        State[State["blank"] = 0] = "blank";
        State[State["initiate"] = 1] = "initiate";
        State[State["open"] = 2] = "open";
        State[State["pause"] = 3] = "pause";
        State[State["lock"] = 4] = "lock";
        State[State["seal"] = 5] = "seal";
        State[State["error"] = 6] = "error";
        State[State["crash"] = 7] = "crash";
        State[State["terminate"] = 8] = "terminate";
        State[State["close"] = 9] = "close";
    })(MODULE.State || (MODULE.State = {}));
    var State = MODULE.State;
    // Event
    MODULE.EVENT = {
        PJAX: MODULE.DEF.NAME.toLowerCase(),
        CLICK: 'click',
        SUBMIT: 'submit',
        POPSTATE: 'popstate',
        SCROLL: 'scroll'
    };
})(MODULE || (MODULE = {}));
var MODULE;
(function (MODULE) {
    var MODEL;
    (function (MODEL) {
    })(MODEL = MODULE.MODEL || (MODULE.MODEL = {}));
})(MODULE || (MODULE = {}));
var MODULE;
(function (MODULE) {
    var MODEL;
    (function (MODEL) {
        var APP;
        (function (APP) {
        })(APP = MODEL.APP || (MODEL.APP = {}));
    })(MODEL = MODULE.MODEL || (MODULE.MODEL = {}));
})(MODULE || (MODULE = {}));
var MODULE;
(function (MODULE) {
    var MODEL;
    (function (MODEL) {
        var APP;
        (function (APP) {
            var DATA;
            (function (DATA) {
            })(DATA = APP.DATA || (APP.DATA = {}));
        })(APP = MODEL.APP || (MODEL.APP = {}));
    })(MODEL = MODULE.MODEL || (MODULE.MODEL = {}));
})(MODULE || (MODULE = {}));
var MODULE;
(function (MODULE) {
    // Macro
    function MIXIN(baseClass, mixClasses) {
        var baseClassPrototype = baseClass.prototype;
        mixClasses = mixClasses.reverse();
        for (var iMixClasses = mixClasses.length; iMixClasses--;) {
            var mixClassPrototype = mixClasses[iMixClasses].prototype;
            for (var iProperty in mixClassPrototype) {
                if ('constructor' === iProperty || !baseClassPrototype[iProperty] || !mixClassPrototype.hasOwnProperty(iProperty)) {
                    continue;
                }
                baseClassPrototype[iProperty] = mixClassPrototype[iProperty];
            }
        }
    }
    MODULE.MIXIN = MIXIN;
    function UUID() {
        // version 4
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, gen);
        function gen(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16).toUpperCase();
        }
    }
    MODULE.UUID = UUID;
    function FREEZE(object, deep) {
        if (!Object.freeze || object === object['window'] || 'ownerDocument' in object) {
            return object;
        }
        !Object.isFrozen(object) && Object.freeze(object);
        if (!deep) {
            return object;
        }
        for (var i in object) {
            var prop = object[i];
            if (~'object,function'.indexOf(typeof prop) && prop) {
                FREEZE(prop, deep);
            }
        }
        return object;
    }
    MODULE.FREEZE = FREEZE;
    function SEAL(object, deep) {
        if (!Object.seal || object === object['window'] || 'ownerDocument' in object) {
            return object;
        }
        !Object.isSealed(object) && Object.seal(object);
        if (!deep) {
            return object;
        }
        for (var i in object) {
            var prop = object[i];
            if (~'object,function'.indexOf(typeof prop) && prop) {
                SEAL(prop, deep);
            }
        }
        return object;
    }
    MODULE.SEAL = SEAL;
})(MODULE || (MODULE = {}));
var MODULE;
(function (MODULE) {
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/* MODEL */
var MODULE;
(function (MODULE) {
    var MODEL;
    (function (MODEL) {
        var Template = (function () {
            function Template(state) {
                /**
                 * 拡張モジュール名。ネームスペースにこの名前のプロパティでモジュールが追加される。
                 *
                 * @property NAME
                 * @type String
                 */
                this.NAME = MODULE.DEF.NAME;
                /**
                 * ネームスペース。ここにモジュールが追加される。
                 *
                 * @property NAMESPACE
                 * @type Window|JQuery
                 */
                this.NAMESPACE = MODULE.DEF.NAMESPACE;
                /**
                 * UUID
                 *
                 * @property UUID
                 * @type String
                 */
                this.UUID = MODULE.UUID();
                /**
                 * Modelの遷移状態を持つ
                 *
                 * @property state_
                 * @type {State}
                 */
                this.state_ = 0 /* blank */;
                this.state_ = state;
            }
            Template.prototype.MAIN = function (context) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                return this.main_.apply(this, [context].concat(args));
            };
            Template.prototype.main_ = function (context) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                return context;
            };
            return Template;
        })();
        MODEL.Template = Template;
    })(MODEL = MODULE.MODEL || (MODULE.MODEL = {}));
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/* VIEW */
var MODULE;
(function (MODULE) {
    var VIEW;
    (function (VIEW) {
        var Template = (function () {
            function Template(state) {
                /**
                 * UUID
                 *
                 * @property UUID
                 * @type String
                 */
                this.UUID = MODULE.UUID();
                /**
                 * Viewの遷移状態を持つ
                 *
                 * @property state_
                 * @type {State}
                 */
                this.state_ = 0 /* blank */;
                this.state_ = state;
            }
            return Template;
        })();
        VIEW.Template = Template;
    })(VIEW = MODULE.VIEW || (MODULE.VIEW = {}));
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="_template.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/* VIEW */
var MODULE;
(function (MODULE) {
    var VIEW;
    (function (VIEW) {
        var Main = (function (_super) {
            __extends(Main, _super);
            function Main(model_, controller_, context_, setting) {
                var _this = this;
                _super.call(this, 1 /* initiate */);
                this.model_ = model_;
                this.controller_ = controller_;
                this.context_ = context_;
                // VIEWの待ち受けるイベントに登録されるハンドラ
                this.handlers = {
                    click: function () {
                        _this.controller_.click(arguments);
                    },
                    submit: function () {
                        _this.controller_.submit(arguments);
                    },
                    popstate: function () {
                        _this.controller_.popstate(arguments);
                    },
                    scroll: function () {
                        _this.controller_.scroll(arguments);
                    }
                };
                MODULE.FREEZE(this);
                this.observe_(setting);
            }
            Main.prototype.observe_ = function (setting) {
                this.release_(setting);
                setting.link && this.context_.delegate(setting.link, setting.nss.event.click, this.handlers.click);
                setting.form && this.context_.delegate(setting.form, setting.nss.event.submit, this.handlers.submit);
                jQuery(window).bind(setting.nss.event.popstate, this.handlers.popstate);
                setting.database.active && setting.fix.scroll && jQuery(window).bind(setting.nss.event.scroll, this.handlers.scroll);
                return this;
            };
            Main.prototype.release_ = function (setting) {
                setting.link && this.context_.undelegate(setting.link, setting.nss.event.click);
                setting.form && this.context_.undelegate(setting.form, setting.nss.event.submit);
                jQuery(window).unbind(setting.nss.event.popstate);
                setting.database.active && setting.fix.scroll && jQuery(window).unbind(setting.nss.event.scroll);
                return this;
            };
            return Main;
        })(VIEW.Template);
        VIEW.Main = Main;
    })(VIEW = MODULE.VIEW || (MODULE.VIEW = {}));
})(MODULE || (MODULE = {}));
var MODULE;
(function (MODULE) {
    MODULE.View = MODULE.VIEW.Main;
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="../view/main.ts"/>
/* CONTROLLER */
var MODULE;
(function (MODULE) {
    var CONTROLLER;
    (function (CONTROLLER) {
        var Functions = (function () {
            function Functions() {
                MODULE.FREEZE(this);
            }
            Functions.prototype.enable = function () {
                MODULE.Model.singleton().enable();
                return this;
            };
            Functions.prototype.disable = function () {
                MODULE.Model.singleton().disable();
                return this;
            };
            Functions.prototype.click = function (url, attrs) {
                var $anchor;
                switch (typeof url) {
                    case 'undefined':
                        $anchor = jQuery(this).filter('a').first().clone();
                        break;
                    case 'object':
                        $anchor = jQuery(url).clone();
                        break;
                    case 'string':
                        attrs = jQuery.extend(true, {}, attrs, { href: url });
                        $anchor = jQuery('<a/>', attrs);
                        break;
                    default:
                        return this;
                }
                var setting = MODULE.Model.singleton().configure($anchor[0]);
                setting && $anchor.first().one(setting.nss.event.click, function () { return MODULE.Controller.singleton().click(arguments); }).click();
                return this;
            };
            Functions.prototype.submit = function (url, attrs, data) {
                var $form, df = document.createDocumentFragment(), type, $element;
                switch (typeof url) {
                    case 'undefined':
                        $form = jQuery(this).filter('form').first().clone();
                        break;
                    case 'object':
                        $form = jQuery(url).clone();
                        break;
                    case 'string':
                        attrs = jQuery.extend(true, {}, attrs, { action: url });
                        type = data instanceof Array && Array || data instanceof Object && Object || undefined;
                        for (var i in data) {
                            switch (type) {
                                case Object:
                                    if (!Object.prototype.hasOwnProperty.call(data, i)) {
                                        continue;
                                    }
                                    $element = jQuery('<textarea/>', { name: i }).val(data[i]);
                                    break;
                                case Array:
                                    data[i].attrs = data[i].attrs || {};
                                    data[i].attrs.name = data[i].name || data[i].attrs.name;
                                    data[i].attrs.type = data[i].type || data[i].attrs.type;
                                    $element = jQuery('<' + data[i].tag + '/>', data[i].attrs).val(data[i].value);
                                    break;
                                default:
                                    continue;
                            }
                            df.appendChild($element[0]);
                        }
                        $form = jQuery('<form/>', attrs).append(df);
                        break;
                    default:
                        return this;
                }
                var setting = MODULE.Model.singleton().configure($form[0]);
                setting && $form.first().one(setting.nss.event.submit, function () { return MODULE.Controller.singleton().submit(arguments); }).submit();
                return this;
            };
            Functions.prototype.getCache = function (url) {
                if (url === void 0) { url = window.location.href; }
                var cache = MODULE.Model.singleton().getCache(url);
                if (cache) {
                    cache = {
                        data: cache.data,
                        textStatus: cache.textStatus,
                        jqXHR: cache.jqXHR,
                        expires: cache.expires
                    };
                }
                return cache;
            };
            Functions.prototype.setCache = function (url, data, textStatus, jqXHR) {
                if (url === void 0) { url = window.location.href; }
                switch (arguments.length) {
                    case 0:
                        return this.setCache(url, document.documentElement.outerHTML);
                    case 1:
                        return this.setCache(url, null);
                    case 2:
                    case 3:
                    case 4:
                    default:
                        MODULE.Model.singleton().setCache(url, data, textStatus, jqXHR);
                }
                return this;
            };
            Functions.prototype.removeCache = function (url) {
                if (url === void 0) { url = window.location.href; }
                MODULE.Model.singleton().removeCache(url);
                return this;
            };
            Functions.prototype.clearCache = function () {
                MODULE.Model.singleton().clearCache();
                return this;
            };
            Functions.prototype.follow = function (event, $xhr, host, timeStamp) {
                if (!MODULE.Model.singleton().isDeferrable) {
                    return false;
                }
                var anchor = event.currentTarget;
                $xhr.follow = true;
                $xhr.host = host || '';
                if (isFinite(event.timeStamp)) {
                    $xhr.timeStamp = timeStamp || event.timeStamp;
                }
                MODULE.Model.singleton().setXHR($xhr);
                jQuery.when($xhr).done(function () {
                    !MODULE.Model.singleton().getCache(anchor.href) && MODULE.Model.singleton().isOperatable(event) && MODULE.Model.singleton().setCache(anchor.href, undefined, undefined, $xhr);
                });
                jQuery[MODULE.DEF.NAME].click(anchor.href);
                return true;
            };
            Functions.prototype.bypass = function () {
                return MODULE.Model.singleton().bypass();
            };
            Functions.prototype.host = function () {
                return MODULE.Model.singleton().host();
            };
            return Functions;
        })();
        CONTROLLER.Functions = Functions;
    })(CONTROLLER = MODULE.CONTROLLER || (MODULE.CONTROLLER = {}));
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="function.ts"/>
/// <reference path="../view/main.ts"/>
/* CONTROLLER */
var MODULE;
(function (MODULE) {
    var CONTROLLER;
    (function (CONTROLLER) {
        var Methods = (function () {
            function Methods() {
                MODULE.FREEZE(this);
            }
            return Methods;
        })();
        CONTROLLER.Methods = Methods;
    })(CONTROLLER = MODULE.CONTROLLER || (MODULE.CONTROLLER = {}));
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="../model/_template.ts"/>
/// <reference path="function.ts"/>
/// <reference path="method.ts"/>
/* CONTROLLER */
var MODULE;
(function (MODULE) {
    var CONTROLLER;
    (function (CONTROLLER) {
        var Template = (function () {
            function Template(model, state) {
                /**
                 * UUID
                 *
                 * @property UUID
                 * @type String
                 */
                this.UUID = MODULE.UUID();
                /**
                 * Controllerの遷移状態を持つ
                 *
                 * @property state_
                 * @type {State}
                 */
                this.state_ = 0 /* blank */;
                /**
                 * 拡張のプロパティを指定する
                 *
                 * @property PROPERTIES
                 * @type {String}
                 */
                this.PROPERTIES = [];
                this.state_ = state;
            }
            Template.prototype.EXTEND = function (context) {
                if (context instanceof MODULE.DEF.NAMESPACE) {
                    if (context instanceof jQuery) {
                        // コンテクストへの変更をend()で戻せるようadd()
                        context = context.add();
                    }
                    // コンテクストに関数を設定
                    this.REGISTER_FUNCTION(context);
                    // コンテクストにメソッドを設定
                    this.REGISTER_METHOD(context);
                }
                else {
                    if (context !== this.EXTENSION) {
                        // コンテクストを拡張に変更
                        context = this.EXTENSION;
                    }
                    // コンテクストに関数を設定
                    this.REGISTER_FUNCTION(context);
                }
                // コンテクストのプロパティを更新
                this.UPDATE_PROPERTIES(context);
                return context;
            };
            /**
             * 拡張モジュール本体のスコープ。
             *
             * @method REGISTER
             * @param {Any} [params]* パラメータ
             */
            Template.prototype.REGISTER = function (model) {
                var S = this;
                this.EXTENSION = this.EXTENSION || function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i - 0] = arguments[_i];
                    }
                    var context = S.EXTEND(this);
                    args = [context].concat(args);
                    args = S.EXEC.apply(S, args);
                    return args instanceof Array ? model.MAIN.apply(model, args) : args;
                };
                this.EXTEND(this.EXTENSION);
                // プラグインに関数を設定してネームスペースに登録
                window[MODULE.DEF.NAMESPACE] = window[MODULE.DEF.NAMESPACE] || {};
                if (MODULE.DEF.NAMESPACE.prototype) {
                    MODULE.DEF.NAMESPACE[MODULE.DEF.NAME] = MODULE.DEF.NAMESPACE.prototype[MODULE.DEF.NAME] = this.EXTENSION;
                }
                else {
                    MODULE.DEF.NAMESPACE[MODULE.DEF.NAME] = this.EXTENSION;
                }
            };
            Template.prototype.EXEC = function () {
                return this.exec_.apply(this, arguments);
            };
            Template.prototype.exec_ = function (context) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                return [context].concat(args);
            };
            Template.prototype.REGISTER_FUNCTION = function (context) {
                var funcs = this.FUNCTIONS;
                for (var i in funcs) {
                    if ('constructor' === i) {
                        continue;
                    }
                    context[i] = funcs[i];
                }
                return context;
            };
            Template.prototype.REGISTER_METHOD = function (context) {
                var METHODS = this.METHODS;
                for (var i in METHODS) {
                    if ('constructor' === i) {
                        continue;
                    }
                    context[i] = METHODS[i];
                }
                return context;
            };
            Template.prototype.UPDATE_PROPERTIES = function (context) {
                var props = this.PROPERTIES;
                var i, len, prop;
                for (i = 0, len = props.length; i < len; i++) {
                    if ('constructor' === i) {
                        continue;
                    }
                    prop = props[i];
                    if (context[prop]) {
                        context[prop] = context[prop]();
                    }
                }
                return context;
            };
            return Template;
        })();
        CONTROLLER.Template = Template;
    })(CONTROLLER = MODULE.CONTROLLER || (MODULE.CONTROLLER = {}));
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="_template.ts"/>
/* CONTROLLER */
var MODULE;
(function (MODULE) {
    var CONTROLLER;
    (function (CONTROLLER) {
        var Main = (function (_super) {
            __extends(Main, _super);
            function Main(model_) {
                _super.call(this, model_, 1 /* initiate */);
                this.model_ = model_;
                this.FUNCTIONS = new CONTROLLER.Functions();
                this.METHODS = new CONTROLLER.Methods();
                this.REGISTER(model_);
                MODULE.FREEZE(this);
            }
            Main.prototype.exec_ = function ($context) {
                var args = [].slice.call(arguments, 1, 2), option = args[0];
                switch (typeof option) {
                    case 'undefined':
                    case 'object':
                        break;
                    default:
                        return $context;
                }
                return [$context].concat(args);
            };
            Main.prototype.view = function (context, setting) {
                return new MODULE.View(this.model_, this, context, setting);
            };
            Main.prototype.click = function (args) {
                this.model_.click.apply(this.model_, args);
            };
            Main.prototype.submit = function (args) {
                this.model_.submit.apply(this.model_, args);
            };
            Main.prototype.popstate = function (args) {
                this.model_.popstate.apply(this.model_, args);
            };
            Main.prototype.scroll = function (args) {
                this.model_.scroll.apply(this.model_, args);
            };
            return Main;
        })(CONTROLLER.Template);
        CONTROLLER.Main = Main;
        var Singleton = (function () {
            function Singleton(model) {
                if (model === void 0) { model = MODULE.Model.singleton(); }
                Singleton.instance_ = Singleton.instance_ || new Main(model);
            }
            Singleton.singleton = function () {
                return Singleton.instance_;
            };
            Singleton.prototype.singleton = function () {
                return Singleton.singleton();
            };
            return Singleton;
        })();
        CONTROLLER.Singleton = Singleton;
    })(CONTROLLER = MODULE.CONTROLLER || (MODULE.CONTROLLER = {}));
})(MODULE || (MODULE = {}));
var MODULE;
(function (MODULE) {
    MODULE.Controller = MODULE.CONTROLLER.Singleton;
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/* MODEL */
var MODULE;
(function (MODULE) {
    var LIBRARY;
    (function (LIBRARY) {
        var Task = (function () {
            function Task(mode, size) {
                if (mode === void 0) { mode = 1; }
                if (size === void 0) { size = 0; }
                this.list_ = []; // [[(...args: any[]) => void, context: any, args?: any[]], ...]
                this.config_ = {
                    mode: 1,
                    size: 0
                };
                this.table_ = {};
                this.option_ = {};
                this.config_.mode = mode || this.config_.mode;
                this.config_.size = size || this.config_.size;
            }
            Task.prototype.define = function (label, mode, size) {
                if (mode === void 0) { mode = this.config_.mode; }
                if (size === void 0) { size = this.config_.size; }
                this.option_[label] = {
                    mode: mode,
                    size: size
                };
                this.table_[label] = [];
            };
            Task.prototype.reserve = function (label, task) {
                switch (typeof label) {
                    case 'string':
                        !this.option_[label] && this.define(label);
                        var config = this.option_[label], list = this.table_[label], args = [].slice.call(arguments, 2);
                        break;
                    case 'function':
                        task = label;
                        label = undefined;
                        var config = this.config_, list = this.list_, args = [].slice.call(arguments, 1);
                        break;
                    default:
                        return;
                }
                if ('function' !== typeof task) {
                    return;
                }
                var method;
                if (config.mode > 0) {
                    method = 'push';
                }
                else {
                    method = 'unshift';
                }
                list[method]([task, args.shift(), args]);
            };
            Task.prototype.digest = function (label, limit) {
                switch (typeof label) {
                    case 'string':
                        !this.option_[label] && this.define(label);
                        limit = limit || 0;
                        var config = this.option_[label], list = this.table_[label];
                        if (!list) {
                            return;
                        }
                        break;
                    case 'number':
                    case 'undefined':
                        limit = label || 0;
                        label = undefined;
                        var config = this.config_, list = this.list_;
                        break;
                    default:
                        return;
                }
                if (list.length > config.size && config.size) {
                    if (config.mode > 0) {
                        list.splice(0, list.length - config.size);
                    }
                    else {
                        list.splice(list.length - config.size, list.length);
                    }
                }
                var task;
                limit = limit || -1;
                while (task = limit-- && list.pop()) {
                    task.shift().apply(task.shift() || window, task.shift() || []);
                }
                if (undefined === label) {
                    var table = this.table_;
                    for (var i in table) {
                        this.digest(i, limit);
                    }
                }
            };
            Task.prototype.clear = function (label) {
                switch (typeof label) {
                    case 'string':
                        !this.option_[label] && this.define(label);
                        this.table_[label].splice(0, this.table_[label].length);
                        break;
                    default:
                        var table = this.table_;
                        for (var i in table) {
                            this.clear(i);
                        }
                }
            };
            return Task;
        })();
        LIBRARY.Task = Task;
    })(LIBRARY = MODULE.LIBRARY || (MODULE.LIBRARY = {}));
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="../library/task.ts"/>
/* MODEL */
var MODULE;
(function (MODULE) {
    var MODEL;
    (function (MODEL) {
        var APP;
        (function (APP) {
            var DATA;
            (function (DATA) {
                var DB;
                (function (DB) {
                    var STATEFUL;
                    (function (STATEFUL) {
                        var Task = (function () {
                            function Task(task_) {
                                this.task_ = task_;
                                this.labels_ = {
                                    done: 'done',
                                    fail: 'fail',
                                    always: 'always'
                                };
                            }
                            Task.prototype.done = function (callback) {
                                this.task_.reserve(this.labels_.done, callback);
                                return this;
                            };
                            Task.prototype.fail = function (callback) {
                                this.task_.reserve(this.labels_.fail, callback);
                                return this;
                            };
                            Task.prototype.always = function (callback) {
                                this.task_.reserve(this.labels_.always, callback);
                                return this;
                            };
                            Task.prototype.resolve = function () {
                                this.task_.clear(this.labels_.fail);
                                this.task_.digest(this.labels_.done);
                                this.task_.digest(this.labels_.always);
                                return this;
                            };
                            Task.prototype.reject = function () {
                                this.task_.clear(this.labels_.done);
                                this.task_.digest(this.labels_.fail);
                                this.task_.digest(this.labels_.always);
                                return this;
                            };
                            return Task;
                        })();
                        STATEFUL.Task = Task;
                        var TaskUp = (function (_super) {
                            __extends(TaskUp, _super);
                            function TaskUp() {
                                _super.apply(this, arguments);
                            }
                            return TaskUp;
                        })(Task);
                        STATEFUL.TaskUp = TaskUp;
                        var TaskDown = (function (_super) {
                            __extends(TaskDown, _super);
                            function TaskDown() {
                                _super.apply(this, arguments);
                            }
                            TaskDown.prototype.done = function (callback) {
                                return this;
                            };
                            TaskDown.prototype.fail = function (callback) {
                                return this;
                            };
                            TaskDown.prototype.always = function (callback) {
                                return this;
                            };
                            TaskDown.prototype.resolve = function () {
                                return this;
                            };
                            return TaskDown;
                        })(Task);
                        STATEFUL.TaskDown = TaskDown;
                    })(STATEFUL = DB.STATEFUL || (DB.STATEFUL = {}));
                })(DB = DATA.DB || (DATA.DB = {}));
            })(DATA = APP.DATA || (APP.DATA = {}));
        })(APP = MODEL.APP || (MODEL.APP = {}));
    })(MODEL = MODULE.MODEL || (MODULE.MODEL = {}));
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="../library/task.ts"/>
/// <reference path="data.db.stateful.task.ts"/>
/* MODEL */
var MODULE;
(function (MODULE) {
    var MODEL;
    (function (MODEL) {
        var APP;
        (function (APP) {
            var DATA;
            (function (DATA) {
                var DB;
                (function (DB) {
                    var Stateful = (function () {
                        function Stateful(origin_, connect_, extend_) {
                            var _this = this;
                            this.origin_ = origin_;
                            this.connect_ = connect_;
                            this.extend_ = extend_;
                            this.state_ = function () { return _this.origin_.state(); };
                            this.task_ = new MODULE.LIBRARY.Task();
                            this.cache_ = {
                                stateful: {}
                            };
                        }
                        Stateful.prototype.stateful_ = function () {
                            var _this = this;
                            var select = function (statefulClass, taskable) {
                                return _this.cache_.stateful[_this.state_()] = _this.cache_.stateful[_this.state_()] || new statefulClass(_this.origin_, _this.connect_, _this.extend_, _this.task_, taskable);
                            };
                            switch (this.state_()) {
                                case 0 /* blank */:
                                    return select(DB.STATE.Blank, true);
                                case 1 /* initiate */:
                                    return select(DB.STATE.Initiate, true);
                                case 2 /* open */:
                                    return select(DB.STATE.Open, true);
                                case 9 /* close */:
                                    return select(DB.STATE.Close, true);
                                case 8 /* terminate */:
                                    return select(DB.STATE.Terminate, true);
                                case 6 /* error */:
                                    return select(DB.STATE.Error, false);
                                default:
                                    return select(DB.STATE.Except, false);
                            }
                        };
                        Stateful.prototype.open = function () {
                            return this.stateful_().open();
                        };
                        Stateful.prototype.resolve = function () {
                            return this.stateful_().resolve();
                        };
                        Stateful.prototype.reject = function () {
                            return this.stateful_().reject();
                        };
                        return Stateful;
                    })();
                    DB.Stateful = Stateful;
                })(DB = DATA.DB || (DATA.DB = {}));
            })(DATA = APP.DATA || (APP.DATA = {}));
        })(APP = MODEL.APP || (MODEL.APP = {}));
    })(MODEL = MODULE.MODEL || (MODULE.MODEL = {}));
})(MODULE || (MODULE = {}));
var MODULE;
(function (MODULE) {
    var MODEL;
    (function (MODEL) {
        var APP;
        (function (APP) {
            var DATA;
            (function (DATA) {
                var DB;
                (function (DB) {
                    var STATE;
                    (function (STATE) {
                        var Default = (function () {
                            function Default(origin, connect, extend, task, taskable) {
                                this.origin = origin;
                                this.connect = connect;
                                this.extend = extend;
                                this.task = taskable ? new DB.STATEFUL.TaskUp(task) : new DB.STATEFUL.TaskDown(task);
                            }
                            Default.prototype.open = function () {
                                // 無効
                                return this.task;
                            };
                            Default.prototype.resolve = function () {
                                // 無効
                            };
                            Default.prototype.reject = function () {
                                // 常に処理可能
                                this.task.reject();
                            };
                            return Default;
                        })();
                        STATE.Default = Default;
                        var Blank = (function (_super) {
                            __extends(Blank, _super);
                            function Blank() {
                                _super.apply(this, arguments);
                            }
                            Blank.prototype.open = function () {
                                // 新規接続
                                this.connect();
                                return this.task;
                            };
                            Blank.prototype.resolve = function () {
                                // 接続のコールバックによりタスクを処理
                                this.open();
                            };
                            Blank.prototype.reject = function () {
                                // 常に処理可能
                                this.task.reject();
                            };
                            return Blank;
                        })(Default);
                        STATE.Blank = Blank;
                        var Initiate = (function (_super) {
                            __extends(Initiate, _super);
                            function Initiate() {
                                _super.apply(this, arguments);
                            }
                            Initiate.prototype.open = function () {
                                // 無効
                                return this.task;
                            };
                            Initiate.prototype.resolve = function () {
                                // 接続のコールバックによりタスクを処理
                            };
                            Initiate.prototype.reject = function () {
                                // 常に処理可能
                                this.task.reject();
                            };
                            return Initiate;
                        })(Default);
                        STATE.Initiate = Initiate;
                        var Open = (function (_super) {
                            __extends(Open, _super);
                            function Open() {
                                _super.apply(this, arguments);
                            }
                            Open.prototype.open = function () {
                                var _this = this;
                                // 接続の有効期限を延長
                                this.extend();
                                // 戻り値のオブジェクトを使用したタスクの追加を待ってタスクを処理
                                setTimeout(function () { return _this.origin.resolve(); }, 1);
                                return this.task;
                            };
                            Open.prototype.resolve = function () {
                                // 現接続によりタスクを処理
                                this.task.resolve();
                            };
                            Open.prototype.reject = function () {
                                // 常に処理可能
                                this.task.reject();
                            };
                            return Open;
                        })(Default);
                        STATE.Open = Open;
                        var Close = (function (_super) {
                            __extends(Close, _super);
                            function Close() {
                                _super.apply(this, arguments);
                            }
                            Close.prototype.open = function () {
                                // 再接続
                                this.connect();
                                return this.task;
                            };
                            Close.prototype.resolve = function () {
                                // 再接続しコールバックによりタスクを処理
                                this.open();
                            };
                            Close.prototype.reject = function () {
                                // 常に処理可能
                                this.task.reject();
                            };
                            return Close;
                        })(Default);
                        STATE.Close = Close;
                        var Terminate = (function (_super) {
                            __extends(Terminate, _super);
                            function Terminate() {
                                _super.apply(this, arguments);
                            }
                            return Terminate;
                        })(Default);
                        STATE.Terminate = Terminate;
                        var Error = (function (_super) {
                            __extends(Error, _super);
                            function Error() {
                                _super.apply(this, arguments);
                            }
                            return Error;
                        })(Default);
                        STATE.Error = Error;
                        var Except = (function (_super) {
                            __extends(Except, _super);
                            function Except() {
                                _super.apply(this, arguments);
                            }
                            return Except;
                        })(Default);
                        STATE.Except = Except;
                    })(STATE = DB.STATE || (DB.STATE = {}));
                })(DB = DATA.DB || (DATA.DB = {}));
            })(DATA = APP.DATA || (APP.DATA = {}));
        })(APP = MODEL.APP || (MODEL.APP = {}));
    })(MODEL = MODULE.MODEL || (MODULE.MODEL = {}));
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="data.db.ts"/>
/* MODEL */
var MODULE;
(function (MODULE) {
    var MODEL;
    (function (MODEL) {
        var APP;
        (function (APP) {
            var DATA;
            (function (DATA) {
                var Store = (function () {
                    function Store(DB) {
                        this.DB = DB;
                        this.autoIncrement = false;
                        this.indexes = [];
                        this.size = 100;
                        this.buffer = {};
                        this.diff = {};
                    }
                    Store.prototype.accessStore = function (callback, mode) {
                        var _this = this;
                        if (mode === void 0) { mode = 'readwrite'; }
                        try {
                            var database = this.DB.database(), store = database && database.transaction(this.name, mode).objectStore(this.name);
                        }
                        catch (err) {
                        }
                        if (store) {
                            callback(store);
                        }
                        else {
                            this.DB.open().done(function () { return _this.accessStore(callback); });
                        }
                    };
                    Store.prototype.accessCount = function () {
                        var index = 'string' === typeof arguments[0] && arguments[0], callback = arguments[index ? 1 : 0];
                        this.accessStore(function (store) {
                            var req = index ? store.index(index).count() : store.count();
                            req.onsuccess = function () {
                                callback.apply(this, [].slice.call(arguments, 1).concat(this.result));
                            };
                        });
                    };
                    Store.prototype.accessRecord = function (key, callback, mode) {
                        this.accessStore(function (store) {
                            store.get(key).onsuccess = callback;
                        }, mode);
                    };
                    Store.prototype.accessCursor = function (index, range, direction, callback) {
                        this.accessStore(function (store) {
                            var req;
                            if (direction && range) {
                                req = store.index(index).openCursor(range, direction);
                            }
                            else if (range) {
                                req = store.index(index).openCursor(range);
                            }
                            else {
                                req = store.openCursor();
                            }
                            req.onsuccess = callback;
                        });
                    };
                    Store.prototype.accessAll = function (index, range, direction, callback) {
                        if ('function' === typeof index) {
                            callback = index;
                            index = null;
                            range = null;
                            direction = null;
                        }
                        this.accessCursor(index, range, direction, callback);
                    };
                    Store.prototype.get = function (key, callback) {
                        var _this = this;
                        this.accessRecord(key, function (event) {
                            _this.setBuffer(event.target.result);
                            callback(event);
                        });
                    };
                    Store.prototype.set = function (value, merge) {
                        var _this = this;
                        value = jQuery.extend(true, {}, value);
                        this.setBuffer(value, merge);
                        this.accessRecord(value[this.keyPath], function (event) {
                            event.target.source.put(merge ? jQuery.extend(true, {}, event.target.result, value) : value);
                            if (!_this.autoIncrement) {
                                delete _this.diff[value[_this.keyPath]];
                            }
                        });
                    };
                    Store.prototype.remove = function (key) {
                        this.removeBuffer(key);
                        this.accessStore(function (store) {
                            store['delete'](key);
                        });
                    };
                    Store.prototype.clear = function () {
                        this.clearBuffer();
                        this.accessStore(function (store) {
                            store.clear();
                        });
                    };
                    Store.prototype.clean = function () {
                        var _this = this;
                        if (!this.size || !this.indexes.length) {
                            return;
                        }
                        var index = this.indexes[0].name, size = this.size;
                        this.accessCount(index, function (count) {
                            if (count <= size) {
                                return;
                            }
                            size = count - size;
                            _this.accessCursor(index, _this.DB.IDBKeyRange.upperBound(Infinity), 'next', function (event) {
                                if (!event.target.result || !size--) {
                                    return;
                                }
                                var cursor = event.target.result;
                                delete _this.diff[cursor.primaryKey];
                                cursor['delete']();
                                cursor['continue']();
                            });
                        });
                    };
                    Store.prototype.loadBuffer = function (callback) {
                        if (this.autoIncrement) {
                            return;
                        }
                        var buffer = this.buffer;
                        if (this.indexes.length) {
                            this.DB.IDBKeyRange && this.accessAll(this.indexes[0].name, this.DB.IDBKeyRange.upperBound(Infinity), 'prev', proc);
                        }
                        else {
                            this.accessAll(proc);
                        }
                        function proc() {
                            if (!this.result) {
                                return callback && callback();
                            }
                            var cursor = this.result;
                            buffer[cursor.primaryKey] = cursor.value;
                            cursor['continue']();
                        }
                    };
                    Store.prototype.saveBuffer = function (callback) {
                        var _this = this;
                        if (this.autoIncrement) {
                            return;
                        }
                        this.accessStore(function (store) {
                            for (var i in _this.diff) {
                                store.put(_this.diff[i]);
                            }
                            callback && callback();
                        });
                    };
                    Store.prototype.getBuffers = function () {
                        return this.buffer;
                    };
                    Store.prototype.setBuffers = function (values, merge) {
                        for (var i in values) {
                            this.setBuffer(values[i], merge);
                        }
                        return this.buffer;
                    };
                    Store.prototype.getBuffer = function (key) {
                        if (this.autoIncrement) {
                            return;
                        }
                        return this.buffer[key];
                    };
                    Store.prototype.setBuffer = function (value, merge) {
                        if (this.autoIncrement) {
                            return;
                        }
                        if (!value) {
                            return value;
                        }
                        var key = value[this.keyPath];
                        this.buffer[key] = !merge ? value : jQuery.extend(true, {}, this.buffer[key], value);
                        this.diff[key] = this.buffer[key];
                        return this.buffer[key];
                    };
                    Store.prototype.removeBuffer = function (key) {
                        if (this.autoIncrement) {
                            return;
                        }
                        var value = this.buffer[key];
                        delete this.buffer[key];
                        delete this.diff[key];
                        return value;
                    };
                    Store.prototype.clearBuffer = function () {
                        if (this.autoIncrement) {
                            return;
                        }
                        for (var i in this.buffer) {
                            delete this.buffer[i];
                        }
                        for (var i in this.diff) {
                            delete this.diff[i];
                        }
                    };
                    return Store;
                })();
                DATA.Store = Store;
            })(DATA = APP.DATA || (APP.DATA = {}));
        })(APP = MODEL.APP || (MODEL.APP = {}));
    })(MODEL = MODULE.MODEL || (MODULE.MODEL = {}));
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="data.store.ts"/>
/* MODEL */
var MODULE;
(function (MODULE) {
    var MODEL;
    (function (MODEL) {
        var APP;
        (function (APP) {
            var DATA;
            (function (DATA) {
                var STORE;
                (function (STORE) {
                    var Meta = (function (_super) {
                        __extends(Meta, _super);
                        function Meta() {
                            _super.apply(this, arguments);
                            this.name = 'meta';
                            this.keyPath = 'key';
                            this.autoIncrement = false;
                            this.size = 0;
                        }
                        return Meta;
                    })(DATA.Store);
                    STORE.Meta = Meta;
                })(STORE = DATA.STORE || (DATA.STORE = {}));
            })(DATA = APP.DATA || (APP.DATA = {}));
        })(APP = MODEL.APP || (MODEL.APP = {}));
    })(MODEL = MODULE.MODEL || (MODULE.MODEL = {}));
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="data.store.ts"/>
/* MODEL */
var MODULE;
(function (MODULE) {
    var MODEL;
    (function (MODEL) {
        var APP;
        (function (APP) {
            var DATA;
            (function (DATA) {
                var STORE;
                (function (STORE) {
                    var History = (function (_super) {
                        __extends(History, _super);
                        function History() {
                            _super.apply(this, arguments);
                            this.name = 'history';
                            this.keyPath = 'url';
                            this.autoIncrement = false;
                            this.indexes = [
                                { name: 'date', keyPath: 'date', option: { unique: false } }
                            ];
                            this.size = 300;
                        }
                        return History;
                    })(DATA.Store);
                    STORE.History = History;
                })(STORE = DATA.STORE || (DATA.STORE = {}));
            })(DATA = APP.DATA || (APP.DATA = {}));
        })(APP = MODEL.APP || (MODEL.APP = {}));
    })(MODEL = MODULE.MODEL || (MODULE.MODEL = {}));
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="data.store.ts"/>
/* MODEL */
var MODULE;
(function (MODULE) {
    var MODEL;
    (function (MODEL) {
        var APP;
        (function (APP) {
            var DATA;
            (function (DATA) {
                var STORE;
                (function (STORE) {
                    var Server = (function (_super) {
                        __extends(Server, _super);
                        function Server() {
                            _super.apply(this, arguments);
                            this.name = 'server';
                            this.keyPath = 'host';
                            this.autoIncrement = false;
                            this.indexes = [
                                { name: 'score', keyPath: 'score', option: { unique: false } }
                            ];
                            this.size = 100;
                        }
                        return Server;
                    })(DATA.Store);
                    STORE.Server = Server;
                })(STORE = DATA.STORE || (DATA.STORE = {}));
            })(DATA = APP.DATA || (APP.DATA = {}));
        })(APP = MODEL.APP || (MODEL.APP = {}));
    })(MODEL = MODULE.MODEL || (MODULE.MODEL = {}));
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="data.db.stateful.ts"/>
/// <reference path="data.store.meta.ts"/>
/// <reference path="data.store.history.ts"/>
/// <reference path="data.store.server.ts"/>
/* MODEL */
var MODULE;
(function (MODULE) {
    var MODEL;
    (function (MODEL) {
        var APP;
        (function (APP) {
            var DATA;
            (function (DATA) {
                var Database = (function () {
                    function Database() {
                        var _this = this;
                        this.IDBFactory = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB;
                        this.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.mozIDBKeyRange || window.msIDBKeyRange;
                        this.name = MODULE.DEF.NAME;
                        this.version = 10;
                        this.refresh = 10;
                        this.upgrade = 0; // 0:virtual 1:native
                        this.revision = 0;
                        this.state_ = 0 /* blank */;
                        this.stateful = new DATA.DB.Stateful(this, function () { return _this.connect(); }, function () { return _this.extend(); });
                        this.age = 10 * 1000;
                        this.expires = 0;
                        this.timer = 0;
                        this.stores = {
                            meta: new DATA.STORE.Meta(this),
                            history: new DATA.STORE.History(this),
                            server: new DATA.STORE.Server(this)
                        };
                        this.meta = {
                            version: { key: 'version', value: undefined },
                            update: { key: 'update', value: undefined },
                            revision: { key: 'revision', value: undefined }
                        };
                    }
                    Database.prototype.state = function () {
                        return this.state_;
                    };
                    Database.prototype.extend = function () {
                        var _this = this;
                        this.expires = new Date().getTime() + this.age;
                        clearTimeout(this.timer);
                        this.timer = setTimeout(function () { return _this.check(); }, this.age);
                    };
                    Database.prototype.check = function () {
                        if (!this.age || new Date().getTime() <= this.expires) {
                            return;
                        }
                        2 /* open */ === this.state() && this.close();
                    };
                    Database.prototype.database = function () {
                        this.extend();
                        return this.database_;
                    };
                    Database.prototype.configure = function (revision, refresh) {
                        this.revision = revision;
                        this.refresh = refresh;
                    };
                    Database.prototype.up = function () {
                        this.state_ = 0 /* blank */;
                        this.open();
                    };
                    Database.prototype.down = function () {
                        this.reject();
                        this.close();
                        this.state_ = 6 /* error */;
                    };
                    Database.prototype.open = function () {
                        !this.IDBFactory && this.down();
                        return this.stateful.open();
                    };
                    Database.prototype.close = function () {
                        this.database_ && this.database_.close && this.database_.close();
                        this.state_ = 9 /* close */;
                    };
                    Database.prototype.resolve = function () {
                        this.stateful.resolve();
                    };
                    Database.prototype.reject = function () {
                        this.stateful.reject();
                    };
                    Database.prototype.connect = function () {
                        this.create();
                    };
                    // 以降、connect()以外からアクセス禁止
                    Database.prototype.create = function () {
                        var _this = this;
                        try {
                            this.close();
                            this.state_ = 1 /* initiate */;
                            var req = this.IDBFactory.open(this.name, this.upgrade ? this.version : 1);
                            var verify = function () {
                                _this.verify(function () {
                                    _this.state_ = 2 /* open */;
                                    _this.resolve();
                                    _this.extend();
                                });
                            };
                            if ('done' === req.readyState) {
                                this.database_ = req.result;
                                if (this.database()) {
                                    verify();
                                }
                                else {
                                    this.format();
                                }
                            }
                            else {
                                var timer = setTimeout(function () { return _this.down(); }, 3000);
                                req.onblocked = function () {
                                    clearTimeout(timer);
                                    _this.database_ = req.result;
                                    _this.close();
                                    setTimeout(function () { return _this.open(); }, 1000);
                                };
                                req.onupgradeneeded = function () {
                                    clearTimeout(timer);
                                    _this.database_ = req.result;
                                    _this.createStores();
                                };
                                req.onsuccess = function () {
                                    clearTimeout(timer);
                                    _this.database_ = req.result;
                                    verify();
                                };
                                req.onerror = function () {
                                    clearTimeout(timer);
                                    _this.database_ = req.result;
                                    _this.down();
                                };
                            }
                        }
                        catch (err) {
                            this.down();
                        }
                    };
                    Database.prototype.destroy = function (success, failure) {
                        var _this = this;
                        try {
                            this.close();
                            this.state_ = 8 /* terminate */;
                            var req = this.IDBFactory.deleteDatabase(this.name);
                            if (req) {
                                req.onsuccess = success;
                                req.onerror = failure;
                            }
                            setTimeout(function () { return 8 /* terminate */ === _this.state() && _this.down(); }, 3000);
                        }
                        catch (err) {
                            this.down();
                        }
                    };
                    Database.prototype.format = function () {
                        var _this = this;
                        this.destroy(function () { return _this.up(); }, function () { return _this.down(); });
                    };
                    Database.prototype.verify = function (success) {
                        var _this = this;
                        var db = this.database(), version = this.version, revision = this.revision, scheme = this.meta, meta = this.stores.meta, failure = function () { return _this.format(); };
                        if (db.objectStoreNames.length !== Object.keys(this.stores).length) {
                            return void failure();
                        }
                        for (var i in this.stores) {
                            var store = db.transaction(this.stores[i].name, 'readonly').objectStore(this.stores[i].name);
                            switch (false) {
                                case store.keyPath === this.stores[i].keyPath:
                                case store.indexNames.length === this.stores[i].indexes.length:
                                    return void failure();
                            }
                        }
                        var cancel = false;
                        meta.get(scheme.version.key, function (event) {
                            // version check
                            if (cancel) {
                                return;
                            }
                            var data = event.target.result;
                            if (!data || _this.upgrade) {
                                meta.set(meta.setBuffer({ key: scheme.version.key, value: version }));
                            }
                            else if (data.value > version) {
                                cancel = true;
                                _this.down();
                            }
                            else if (data.value < version) {
                                cancel = true;
                                failure();
                            }
                        });
                        meta.get(scheme.revision.key, function (event) {
                            // revision check
                            if (cancel) {
                                return;
                            }
                            var data = event.target.result;
                            if (!data) {
                                meta.set(meta.setBuffer({ key: scheme.revision.key, value: revision }));
                            }
                            else if (data.value > revision) {
                                cancel = true;
                                _this.down();
                            }
                            else if (data.value < revision) {
                                cancel = true;
                                failure();
                            }
                        });
                        meta.get(scheme.update.key, function (event) {
                            // refresh check
                            if (cancel) {
                                return;
                            }
                            var data = event.target.result;
                            var days = Math.floor(new Date().getTime() / (24 * 60 * 60 * 1000));
                            if (!data || !_this.refresh) {
                                meta.set(meta.setBuffer({ key: scheme.update.key, value: days + _this.refresh }));
                                success();
                            }
                            else if (data.value > days) {
                                success();
                            }
                            else if (data.value <= days) {
                                failure();
                            }
                        });
                    };
                    Database.prototype.createStores = function () {
                        this.destroyStores();
                        var db = this.database();
                        for (var i in this.stores) {
                            var schema = this.stores[i];
                            var store = db.createObjectStore(schema.name, { keyPath: schema.keyPath, autoIncrement: schema.autoIncrement });
                            for (var j = 0, indexes = schema.indexes, index; index = indexes[j]; j++) {
                                store.createIndex(index.name, index.keyPath, index.option);
                            }
                        }
                    };
                    Database.prototype.destroyStores = function () {
                        var db = this.database();
                        for (var i = db.objectStoreNames ? db.objectStoreNames.length : 0; i--;) {
                            db.deleteObjectStore(db.objectStoreNames[i]);
                        }
                    };
                    return Database;
                })();
                DATA.Database = Database;
            })(DATA = APP.DATA || (APP.DATA = {}));
        })(APP = MODEL.APP || (MODEL.APP = {}));
    })(MODEL = MODULE.MODEL || (MODULE.MODEL = {}));
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="data.ts"/>
/* MODEL */
var MODULE;
(function (MODULE) {
    var MODEL;
    (function (MODEL) {
        var APP;
        (function (APP) {
            var DATA;
            (function (DATA) {
                var Cookie = (function () {
                    function Cookie(age_) {
                        this.age_ = age_;
                    }
                    Cookie.prototype.getCookie = function (key) {
                        if (!key || !window.navigator.cookieEnabled) {
                            return;
                        }
                        var reg = new RegExp('(?:^|; )(' + encodeURIComponent(key) + '=[^;]*)'), data = (document.cookie.match(reg) || []).pop();
                        return data && decodeURIComponent(data.split('=').pop());
                    };
                    Cookie.prototype.setCookie = function (key, value, option) {
                        if (option === void 0) { option = {}; }
                        if (!key || !window.navigator.cookieEnabled) {
                            return;
                        }
                        option.age = option.age || this.age_;
                        document.cookie = [
                            encodeURIComponent(key) + '=' + encodeURIComponent(value),
                            option.age ? '; expires=' + new Date(new Date().getTime() + option.age * 1000).toUTCString() : '',
                            option.path ? '; path=' + option.path : '; path=/',
                            option.secure ? '; secure' : ''
                        ].join('');
                        return this.getCookie(key);
                    };
                    return Cookie;
                })();
                DATA.Cookie = Cookie;
            })(DATA = APP.DATA || (APP.DATA = {}));
        })(APP = MODEL.APP || (MODEL.APP = {}));
    })(MODEL = MODULE.MODEL || (MODULE.MODEL = {}));
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="data.db.ts"/>
/// <reference path="data.cookie.ts"/>
/* MODEL */
var MODULE;
(function (MODULE) {
    var MODEL;
    (function (MODEL) {
        var APP;
        (function (APP) {
            var DATA;
            (function (DATA) {
                var Main = (function () {
                    function Main() {
                        this.DB = new DATA.Database();
                        this.Cookie = new DATA.Cookie(10 * 24 * 60 * 60);
                    }
                    return Main;
                })();
                DATA.Main = Main;
            })(DATA = APP.DATA || (APP.DATA = {}));
        })(APP = MODEL.APP || (MODEL.APP = {}));
    })(MODEL = MODULE.MODEL || (MODULE.MODEL = {}));
})(MODULE || (MODULE = {}));
/* MODEL */
var MODULE;
(function (MODULE) {
    var LIBRARY;
    (function (LIBRARY) {
        var Utility = (function () {
            function Utility() {
            }
            /* string */
            Utility.trim = function (text) {
                text = 'string' === typeof text ? text : String(0 === text && text.toString() || '');
                if (text.trim) {
                    text = text.trim();
                }
                else if (text = text.replace(/^[\s\uFEFF\xA0]+/, '')) {
                    var regSpace = /[\s\uFEFF\xA0]/;
                    var i = text.length, r = i % 8;
                    DUFF: {
                        while (r--) {
                            if (!regSpace.test(text.charAt(--i))) {
                                break DUFF;
                            }
                        }
                        while (i) {
                            if (!regSpace.test(text.charAt(--i))) {
                                break DUFF;
                            }
                            if (!regSpace.test(text.charAt(--i))) {
                                break DUFF;
                            }
                            if (!regSpace.test(text.charAt(--i))) {
                                break DUFF;
                            }
                            if (!regSpace.test(text.charAt(--i))) {
                                break DUFF;
                            }
                            if (!regSpace.test(text.charAt(--i))) {
                                break DUFF;
                            }
                            if (!regSpace.test(text.charAt(--i))) {
                                break DUFF;
                            }
                            if (!regSpace.test(text.charAt(--i))) {
                                break DUFF;
                            }
                            if (!regSpace.test(text.charAt(--i))) {
                                break DUFF;
                            }
                        }
                    }
                    text = text.substring(0, i + 1);
                }
                return text;
            };
            Utility.repeat = function (arg, size) {
                switch (arg instanceof Array && 'array' || typeof arg) {
                    case 'string':
                        var text = arg;
                        return Array(size + 1).join(text);
                    case 'array':
                        var len = arg.length;
                        if (size < 300) {
                            var arr = Array(size);
                            this.duff(-size, function (i) { return arr[i] = arg[i % len]; });
                        }
                        else {
                            var arr = arg.slice();
                            while (arr.length * 2 <= size) {
                                arr = arr.concat(arr);
                            }
                            arr = arr.concat(arr.slice(0, size - arr.length));
                        }
                        return arr;
                }
            };
            Utility.fire = function (fn, context, args, async) {
                if (context === void 0) { context = window; }
                if (args === void 0) { args = []; }
                if ('function' === typeof fn) {
                    return async ? setTimeout(function () {
                        fn.apply(context || window, args);
                    }, 0) : fn.apply(context || window, args);
                }
                else {
                    return fn;
                }
            };
            Utility.duff = function (loop, proc) {
                if (loop < 0) {
                    var i = -loop, r = i % 8;
                    while (r--) {
                        proc(--i);
                    }
                    while (i) {
                        proc(--i);
                        proc(--i);
                        proc(--i);
                        proc(--i);
                        proc(--i);
                        proc(--i);
                        proc(--i);
                        proc(--i);
                    }
                }
                else {
                    var l = loop, i = 0, r = l % 8, q = l / 8 ^ 0;
                    while (r--) {
                        proc(i++);
                    }
                    while (q--) {
                        proc(i++);
                        proc(i++);
                        proc(i++);
                        proc(i++);
                        proc(i++);
                        proc(i++);
                        proc(i++);
                        proc(i++);
                    }
                }
            };
            Utility.duffEx = function (loop, proc) {
                if (loop < 0) {
                    var i = -loop, r = i % 8;
                    DUFF: {
                        while (r--) {
                            if (false === proc(--i)) {
                                break DUFF;
                            }
                        }
                        while (i) {
                            if (false === proc(--i)) {
                                break DUFF;
                            }
                            if (false === proc(--i)) {
                                break DUFF;
                            }
                            if (false === proc(--i)) {
                                break DUFF;
                            }
                            if (false === proc(--i)) {
                                break DUFF;
                            }
                            if (false === proc(--i)) {
                                break DUFF;
                            }
                            if (false === proc(--i)) {
                                break DUFF;
                            }
                            if (false === proc(--i)) {
                                break DUFF;
                            }
                            if (false === proc(--i)) {
                                break DUFF;
                            }
                        }
                    }
                }
                else {
                    var l = loop, i = 0, r = l % 8, q = l / 8 ^ 0;
                    DUFF: {
                        while (r--) {
                            if (false === proc(i++)) {
                                break DUFF;
                            }
                        }
                        while (q--) {
                            if (false === proc(i++)) {
                                break DUFF;
                            }
                            if (false === proc(i++)) {
                                break DUFF;
                            }
                            if (false === proc(i++)) {
                                break DUFF;
                            }
                            if (false === proc(i++)) {
                                break DUFF;
                            }
                            if (false === proc(i++)) {
                                break DUFF;
                            }
                            if (false === proc(i++)) {
                                break DUFF;
                            }
                            if (false === proc(i++)) {
                                break DUFF;
                            }
                            if (false === proc(i++)) {
                                break DUFF;
                            }
                        }
                    }
                }
            };
            /* other */
            Utility.normalizeUrl = function (url, transparent) {
                if (transparent === void 0) { transparent = true; }
                var ret;
                // Trim
                ret = this.trim(url);
                // Convert to absolute path
                ret = /^([^:/?#]+):\/\/[^/?#.]+\.[^/?#]+/i.test(ret) ? ret : (function (url, a) {
                    a.href = url;
                    return a.href;
                })(ret, document.createElement('a'));
                // Convert to UTF-8 encoded string
                ret = encodeURI(decodeURI(ret));
                // Remove string of starting with an invalid character
                ret = ret.replace(/["`^|\\<>{}\[\]\s].*/, '');
                // Fix case of percent encoding
                ret = transparent ? this.justifyPercentEncodingUrlCase_(url, ret) : ret;
                return ret;
            };
            Utility.canonicalizeUrl = function (url) {
                var ret = this.normalizeUrl(url, false);
                // Fix case of percent encoding
                ret = ret.replace(/(?:%\w{2})+/g, replaceLowerToUpper);
                function replaceLowerToUpper(str) {
                    return str.toUpperCase();
                }
                return ret;
            };
            Utility.compareUrl = function (a, b) {
                // URLのパーセントエンコーディングの大文字小文字がAndroidのアドレスバーとリンクで異なるためそろえる
                a = this.canonicalizeUrl(a);
                b = this.canonicalizeUrl(b);
                return a === b;
            };
            Utility.justifyPercentEncodingUrlCase_ = function (base, target) {
                return base === target ? target : target.replace(/(?:%\w{2})+/g, replace);
                function replace(str) {
                    var i = ~base.indexOf(str.toUpperCase()) || ~base.indexOf(str.toLowerCase());
                    return i ? base.substr(~i, str.length) : str;
                }
            };
            return Utility;
        })();
        LIBRARY.Utility = Utility;
    })(LIBRARY = MODULE.LIBRARY || (MODULE.LIBRARY = {}));
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="data.ts"/>
/// <reference path="../library/utility.ts"/>
/* MODEL */
var MODULE;
(function (MODULE) {
    var MODEL;
    (function (MODEL) {
        var APP;
        (function (APP) {
            var Data = (function () {
                function Data(model_) {
                    this.model_ = model_;
                    this.data_ = new APP.DATA.Main();
                    this.stores_ = this.data_.DB.stores;
                    this.util_ = MODULE.LIBRARY.Utility;
                }
                // cookie
                Data.prototype.getCookie = function (key) {
                    return this.data_.Cookie.getCookie(key);
                };
                Data.prototype.setCookie = function (key, value, option) {
                    return this.data_.Cookie.setCookie(key, value, option);
                };
                // db
                Data.prototype.connect = function (setting) {
                    if (setting.database.active) {
                        this.data_.DB.configure(setting.database.revision, setting.database.refresh);
                        this.data_.DB.up();
                        this.saveTitle();
                        this.saveScrollPosition();
                    }
                    else {
                        this.data_.DB.down();
                    }
                };
                Data.prototype.loadBuffers = function () {
                    for (var i in this.stores_) {
                        this.stores_[i].loadBuffer();
                    }
                };
                Data.prototype.saveBuffers = function () {
                    for (var i in this.stores_) {
                        this.stores_[i].saveBuffer();
                    }
                };
                // history
                Data.prototype.getHistoryBuffer = function (unsafe_url) {
                    return this.stores_.history.getBuffer(this.model_.convertUrlToKey(unsafe_url, true));
                };
                Data.prototype.loadTitle = function () {
                    var _this = this;
                    var keyUrl = this.model_.convertUrlToKey(window.location.href, true);
                    var data = this.stores_.history.getBuffer(keyUrl);
                    if (data && 'string' === typeof data.title) {
                        document.title = data.title;
                    }
                    else {
                        this.stores_.history.get(keyUrl, function (event) {
                            data = event.target.result;
                            if (data && data.title) {
                                if (_this.model_.compareKeyByUrl(keyUrl, _this.util_.canonicalizeUrl(window.location.href))) {
                                    document.title = data.title;
                                }
                            }
                        });
                    }
                };
                Data.prototype.saveTitle = function (unsafe_url, title) {
                    if (unsafe_url === void 0) { unsafe_url = window.location.href; }
                    if (title === void 0) { title = document.title; }
                    var keyUrl = this.model_.convertUrlToKey(unsafe_url, true);
                    var value = {
                        url: keyUrl,
                        title: title,
                        date: new Date().getTime(),
                        scrollX: undefined,
                        scrollY: undefined,
                        host: undefined,
                        expires: undefined
                    };
                    this.stores_.history.set(value, true);
                    this.stores_.history.clean();
                };
                Data.prototype.loadScrollPosition = function () {
                    var _this = this;
                    var keyUrl = this.model_.convertUrlToKey(window.location.href, true);
                    var data = this.stores_.history.getBuffer(keyUrl);
                    function scroll(scrollX, scrollY) {
                        if ('number' !== typeof scrollX || 'number' !== typeof scrollY) {
                            return;
                        }
                        window.scrollTo(parseInt(Number(scrollX) + '', 10), parseInt(Number(scrollY) + '', 10));
                    }
                    if (data && 'number' === typeof data.scrollX) {
                        scroll(data.scrollX, data.scrollY);
                    }
                    else {
                        this.stores_.history.get(keyUrl, function (event) {
                            data = event.target.result;
                            if (data && 'number' === typeof data.scrollX) {
                                if (_this.model_.compareKeyByUrl(keyUrl, _this.util_.canonicalizeUrl(window.location.href))) {
                                    scroll(data.scrollX, data.scrollY);
                                }
                            }
                        });
                    }
                };
                Data.prototype.saveScrollPosition = function (unsafe_url, scrollX, scrollY) {
                    if (unsafe_url === void 0) { unsafe_url = window.location.href; }
                    if (scrollX === void 0) { scrollX = jQuery(window).scrollLeft(); }
                    if (scrollY === void 0) { scrollY = jQuery(window).scrollTop(); }
                    var keyUrl = this.model_.convertUrlToKey(unsafe_url, true);
                    var value = {
                        url: keyUrl,
                        scrollX: scrollX,
                        scrollY: scrollY,
                        date: new Date().getTime(),
                        title: undefined,
                        host: undefined,
                        expires: undefined
                    };
                    this.stores_.history.set(value, true);
                };
                Data.prototype.loadExpires = function () {
                };
                Data.prototype.saveExpires = function (unsafe_url, host, expires) {
                    var keyUrl = this.model_.convertUrlToKey(unsafe_url, true);
                    var value = {
                        url: keyUrl,
                        host: host || '',
                        expires: expires,
                        title: undefined,
                        scrollX: undefined,
                        scrollY: undefined,
                        date: undefined
                    };
                    this.stores_.history.set(value, true);
                };
                // server
                Data.prototype.getServerBuffers = function () {
                    return this.stores_.server.getBuffers();
                };
                Data.prototype.getServerBuffer = function (unsafe_url) {
                    var host = this.model_.convertUrlToKey(unsafe_url, true).split('//').pop().split('/').shift();
                    host = this.model_.compareKeyByUrl('http://' + host, 'http://' + window.location.host) ? '' : host;
                    return this.stores_.server.getBuffer(host);
                };
                Data.prototype.loadServer = function () {
                };
                Data.prototype.saveServer = function (host, expires, time, score, state) {
                    host = host.split('//').pop().split('/').shift();
                    host = this.model_.compareKeyByUrl('http://' + host, 'http://' + window.location.host) ? '' : host;
                    var value = {
                        host: host,
                        time: Math.max(time, 1),
                        score: score,
                        state: state,
                        expires: expires
                    };
                    this.stores_.server.set(value, true);
                    this.stores_.server.clean();
                };
                Data.prototype.removeServer = function (host) {
                    this.stores_.server.remove(host);
                    this.stores_.server.clean();
                };
                return Data;
            })();
            APP.Data = Data;
        })(APP = MODEL.APP || (MODEL.APP = {}));
    })(MODEL = MODULE.MODEL || (MODULE.MODEL = {}));
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="app.data.ts"/>
/// <reference path="../library/utility.ts"/>
/* MODEL */
var MODULE;
(function (MODULE) {
    var MODEL;
    (function (MODEL) {
        var APP;
        (function (APP) {
            var Balancer = (function () {
                function Balancer(data_) {
                    this.data_ = data_;
                    this.util_ = MODULE.LIBRARY.Utility;
                    this.force_ = false;
                    this._host = '';
                    this.parallel_ = 4;
                }
                Balancer.prototype.host_ = function (host, setting) {
                    if (setting) {
                        this._host = this.sanitize(host, setting);
                    }
                    return this._host;
                };
                Balancer.prototype.host = function () {
                    return this.host_();
                };
                Balancer.prototype.sanitize = function (param, setting) {
                    if (!setting) {
                        return '';
                    }
                    var host;
                    switch (param && typeof param) {
                        case 'string':
                            host = param;
                            break;
                        case 'object':
                            var $xhr = param;
                            host = $xhr.readyState === 4 && $xhr.getResponseHeader(setting.balance.server.header) || $xhr.host;
                            break;
                    }
                    host = host || '';
                    return !/[/?#"`^|\\<>{}\[\]\s]/.test(host) && setting.balance.bounds.test(host) && host;
                };
                Balancer.prototype.enable = function (setting) {
                    if (!setting.balance.active) {
                        return void this.disable(setting);
                    }
                    if (setting.balance.client.support.browser.test(window.navigator.userAgent)) {
                        this.data_.setCookie(setting.balance.client.cookie.balance, '1');
                    }
                    else {
                        return void this.disable(setting);
                    }
                    if (setting.balance.client.support.redirect.test(window.navigator.userAgent)) {
                        this.data_.setCookie(setting.balance.client.cookie.redirect, '1');
                    }
                };
                Balancer.prototype.disable = function (setting) {
                    if (this.data_.getCookie(setting.balance.client.cookie.balance)) {
                        this.data_.setCookie(setting.balance.client.cookie.balance, '0');
                    }
                    if (this.data_.getCookie(setting.balance.client.cookie.redirect)) {
                        this.data_.setCookie(setting.balance.client.cookie.redirect, '0');
                    }
                    this.changeServer('', setting);
                };
                Balancer.prototype.score = function (time, size) {
                    return Math.max(Math.round(size / time * 1000), 0);
                };
                Balancer.prototype.changeServer = function (host, setting) {
                    if (!setting.balance.active) {
                        this.host_('', setting);
                    }
                    else {
                        this.host_(host, setting);
                        this.data_.setCookie(setting.balance.client.cookie.host, host);
                    }
                    return this.host();
                };
                Balancer.prototype.chooseServers_ = function (setting) {
                    var _this = this;
                    var respite = setting.balance.server.respite, weight = setting.balance.weight, timeout = setting.ajax.timeout, hosts = setting.balance.client.hosts.slice();
                    hosts = this.force_ ? jQuery.grep(hosts, function (host) { return !!host; }) : hosts;
                    (function () {
                        var host = _this.data_.getCookie(setting.balance.client.cookie.host);
                        if (_this.force_ && !host) {
                            return;
                        }
                        if (host === _this.sanitize(host, setting)) {
                            !~jQuery.inArray(host, hosts) && hosts.unshift(host);
                        }
                        else {
                            _this.data_.setCookie(setting.balance.client.cookie.host, '');
                        }
                    })();
                    var servers = this.data_.getServerBuffers(), scoreTable = {};
                    jQuery.each(Object.keys(servers), function (i, index) {
                        var server = servers[index];
                        ~jQuery.inArray(server.host, hosts) && hosts.splice(jQuery.inArray(server.host, hosts), 1);
                        if (_this.force_ && !server.host) {
                            return;
                        }
                        if (server.host === _this.sanitize(server.host, setting) && server.expires > new Date().getTime()) {
                            scoreTable[server.score] = server;
                        }
                        else {
                            _this.data_.removeServer(server.host);
                        }
                    });
                    var scores = Object.keys(scoreTable).sort(sortScoreDes);
                    function sortScoreDes(a, b) {
                        return +b - +a;
                    }
                    var result = [], primary;
                    jQuery.each(scores, function (i) {
                        var server = scoreTable[scores[i]], host = server.host, time = server.time, score = server.score, state = server.state;
                        ~jQuery.inArray(host, hosts) && hosts.splice(jQuery.inArray(host, hosts), 1);
                        if (state + respite >= new Date().getTime()) {
                            return;
                        }
                        else if (state) {
                            _this.data_.removeServer(server.host);
                        }
                        switch (true) {
                            case result.length >= setting.balance.random:
                                return false;
                            case weight && !host && !!Math.floor(Math.random() * weight):
                            case timeout && time >= timeout:
                            case result.length >= Math.min(Math.floor(scores.length / 2), 3) && primary && time >= primary.time + 500 && timeout && time >= timeout * 2 / 3:
                            case result.length >= Math.min(Math.floor(scores.length / 2), 3) && primary && score <= primary.score / 2:
                                return;
                        }
                        primary = primary || server;
                        result.push(host);
                    });
                    while (hosts.length) {
                        result.push(hosts.splice(Math.floor(Math.random() * hosts.length), 1).shift());
                    }
                    return result;
                };
                Balancer.prototype.chooseServerFromCache_ = function (setting) {
                    var _this = this;
                    var hosts = [];
                    var history = this.data_.getHistoryBuffer(setting.destLocation.href);
                    switch (true) {
                        case !history:
                            break;
                        case history.host !== this.sanitize(history.host, setting):
                            this.data_.saveExpires(history.url, '', 0);
                        case !history.expires:
                        case history.expires < new Date().getTime():
                        case this.force_ && !history.host:
                            break;
                        default:
                            hosts = jQuery.map(this.data_.getServerBuffers(), function (i, server) {
                                if (server.host !== history.host) {
                                    return;
                                }
                                if (server.state >= new Date().getTime()) {
                                    _this.data_.saveExpires(history.url, history.host, 0);
                                    return;
                                }
                                return server.host;
                            });
                    }
                    return hosts.length ? hosts.pop() || ' ' : '';
                };
                Balancer.prototype.chooseServerFromScore_ = function (setting) {
                    var hosts = this.chooseServers_(setting);
                    return hosts.slice(Math.floor(Math.random() * Math.min(hosts.length, 6))).shift() || ' ';
                };
                Balancer.prototype.chooseServer = function (setting) {
                    if (!setting.balance.active) {
                        return '';
                    }
                    // 正規サーバーを空文字でなくスペースで返させることで短絡評価を行いトリムで空文字に戻す
                    return this.util_.trim(this.chooseServerFromCache_(setting) || this.chooseServerFromScore_(setting));
                };
                Balancer.prototype.bypass = function (setting) {
                    var _this = this;
                    this.force_ = true;
                    var deferred = jQuery.Deferred();
                    if (!setting || !setting.balance.active) {
                        return deferred.reject();
                    }
                    var parallel = this.parallel_, hosts = this.chooseServers_(setting), option = jQuery.extend({}, setting.ajax, setting.balance.option.ajax);
                    hosts = jQuery.grep(hosts, function (host) { return !!host; });
                    var index = 0, length = hosts.length;
                    var test = function (host) {
                        var that = _this, time = new Date().getTime();
                        'pending' === deferred.state() && jQuery.ajax(jQuery.extend({}, option, {
                            url: that.util_.normalizeUrl(window.location.protocol + '//' + host + window.location.pathname.replace(/^\/?/, '/') + window.location.search),
                            xhr: !setting.balance.option.callbacks.ajax.xhr ? undefined : function () {
                                var $xhr;
                                $xhr = that.util_.fire(setting.balance.option.callbacks.ajax.xhr, this, [event, setting]);
                                $xhr = 'object' === typeof $xhr ? $xhr : jQuery.ajaxSettings.xhr();
                                return $xhr;
                            },
                            beforeSend: !setting.balance.option.callbacks.ajax.beforeSend && !setting.server.header ? undefined : function ($xhr, ajaxSetting) {
                                if (setting.server.header) {
                                    $xhr.setRequestHeader(setting.nss.requestHeader, 'true');
                                }
                                if ('object' === typeof setting.server.header) {
                                    $xhr.setRequestHeader(setting.nss.requestHeader, 'true');
                                    setting.server.header.area && $xhr.setRequestHeader(setting.nss.requestHeader + '-Area', this.app_.chooseArea(setting.area, document, document));
                                    setting.server.header.head && $xhr.setRequestHeader(setting.nss.requestHeader + '-Head', setting.load.head);
                                    setting.server.header.css && $xhr.setRequestHeader(setting.nss.requestHeader + '-CSS', setting.load.css.toString());
                                    setting.server.header.script && $xhr.setRequestHeader(setting.nss.requestHeader + '-Script', setting.load.script.toString());
                                }
                                that.util_.fire(setting.balance.option.callbacks.ajax.beforeSend, this, [event, setting, $xhr, ajaxSetting]);
                            },
                            dataFilter: !setting.balance.option.callbacks.ajax.dataFilter ? undefined : function (data, type) {
                                return that.util_.fire(setting.balance.option.callbacks.ajax.dataFilter, this, [event, setting, data, type]) || data;
                            },
                            success: function (data, textStatus, $xhr) {
                                time = new Date().getTime() - time;
                                var server = that.data_.getServerBuffer(this.url), score = that.score(time, $xhr.responseText.length);
                                time = server && !server.state && server.time ? Math.round((server.time + time) / 2) : time;
                                score = server && !server.state && server.score ? Math.round((server.score + score) / 2) : score;
                                that.data_.saveServer(host, new Date().getTime() + setting.balance.server.expires, time, score, 0);
                                host = that.sanitize($xhr, setting) || host;
                                that.util_.fire(setting.balance.option.ajax.success, this, arguments);
                            },
                            error: function ($xhr) {
                                that.data_.saveServer(host, new Date().getTime() + setting.balance.server.expires, 0, 0, new Date().getTime());
                                host = null;
                                that.util_.fire(setting.balance.option.ajax.error, this, arguments);
                            },
                            complete: function () {
                                that.util_.fire(setting.balance.option.ajax.complete, this, arguments);
                                ++index;
                                deferred.notify(index, length, host);
                                if (host) {
                                    that.host_(host, setting);
                                    hosts.splice(0, hosts.length);
                                    deferred.resolve(host);
                                }
                                else if (!that.host() && hosts.length) {
                                    test(hosts.shift());
                                }
                                else {
                                    deferred.reject();
                                }
                            }
                        }));
                    };
                    while (parallel-- && hosts.length) {
                        test(hosts.shift());
                    }
                    return deferred;
                };
                return Balancer;
            })();
            APP.Balancer = Balancer;
        })(APP = MODEL.APP || (MODEL.APP = {}));
    })(MODEL = MODULE.MODEL || (MODULE.MODEL = {}));
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/* MODEL */
var MODULE;
(function (MODULE) {
    var MODEL;
    (function (MODEL) {
        var APP;
        (function (APP) {
            var PageRecord = (function () {
                function PageRecord(url, data, textStatus, $xhr, host) {
                    this.data_ = url ? {
                        url: url,
                        data: data,
                        textStatus: textStatus,
                        jqXHR: $xhr,
                        host: host
                    } : {
                        url: undefined,
                        data: undefined,
                        textStatus: undefined,
                        jqXHR: undefined,
                        host: undefined
                    };
                    this.data = new PageRecordData(this.data_);
                }
                PageRecord.prototype.state = function (setting) {
                    var min = setting ? setting.cache.expires.min : undefined, max = setting ? setting.cache.expires.max : undefined;
                    switch (false) {
                        case this.data.jqXHR() && 200 === +this.data.jqXHR().status:
                        case this.data.expires(min, max) >= new Date().getTime():
                            return false;
                        default:
                            return true;
                    }
                };
                return PageRecord;
            })();
            APP.PageRecord = PageRecord;
            var PageRecordData = (function () {
                function PageRecordData(data_) {
                    this.data_ = data_;
                }
                PageRecordData.prototype.url = function () {
                    return this.data_.url;
                };
                PageRecordData.prototype.data = function () {
                    return this.data_.data;
                };
                PageRecordData.prototype.textStatus = function () {
                    return this.data_.textStatus;
                };
                PageRecordData.prototype.jqXHR = function () {
                    return this.data_.jqXHR;
                };
                PageRecordData.prototype.host = function () {
                    return this.data_.host;
                };
                PageRecordData.prototype.expires = function (min, max) {
                    if (!this.jqXHR() && !this.data()) {
                        return 0;
                    }
                    var $xhr = this.jqXHR(), expires;
                    if ($xhr) {
                        $xhr.timeStamp = $xhr.timeStamp || new Date($xhr.getResponseHeader('Date')).getTime() || new Date().getTime();
                    }
                    switch (true) {
                        case !$xhr:
                            expires = 0;
                            break;
                        case /no-store|no-cache/.test($xhr.getResponseHeader('Cache-Control')):
                            expires = 0;
                            break;
                        case !!$xhr.getResponseHeader('Cache-Control') && !!~$xhr.getResponseHeader('Cache-Control').indexOf('max-age='):
                            expires = new Date($xhr.getResponseHeader('Date') || new Date($xhr.timeStamp).toString()).getTime() + (+$xhr.getResponseHeader('Cache-Control').match(/max-age=(\d*)/).pop() * 1000);
                            break;
                        case !!$xhr.getResponseHeader('Expires'):
                            expires = new Date($xhr.getResponseHeader('Expires')).getTime();
                            break;
                        default:
                            expires = 0;
                    }
                    if (undefined !== min || undefined !== max) {
                        expires = 'number' === typeof min ? Math.max(min + new Date().getTime(), expires) : expires;
                        expires = 'number' === typeof max ? Math.min(max + new Date().getTime(), expires) : expires;
                    }
                    expires = Math.max(expires, 0) || 0;
                    return expires;
                };
                return PageRecordData;
            })();
            APP.PageRecordData = PageRecordData;
        })(APP = MODEL.APP || (MODEL.APP = {}));
    })(MODEL = MODULE.MODEL || (MODULE.MODEL = {}));
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/* MODEL */
var MODULE;
(function (MODULE) {
    var MODEL;
    (function (MODEL) {
        var APP;
        (function (APP) {
            var PageUtility = (function () {
                function PageUtility() {
                }
                PageUtility.prototype.chooseArea = function (areas, srcDocument, dstDocument) {
                    areas = areas instanceof Array ? areas : [areas];
                    var i = -1, area;
                    AREA: while (area = areas[++i]) {
                        var options = area.match(/(?:[^,\(\[]+|\(.*?\)|\[.*?\])+/g);
                        var j = -1;
                        while (options[++j]) {
                            if (!jQuery(options[j], srcDocument).length || !jQuery(options[j], dstDocument).length) {
                                continue AREA;
                            }
                        }
                        return area;
                    }
                };
                PageUtility.prototype.dispatchEvent = function (target, eventType, bubbling, cancelable) {
                    var event = document.createEvent('HTMLEvents');
                    event.initEvent(eventType, bubbling, cancelable);
                    target.dispatchEvent(event);
                };
                return PageUtility;
            })();
            APP.PageUtility = PageUtility;
        })(APP = MODEL.APP || (MODEL.APP = {}));
    })(MODEL = MODULE.MODEL || (MODULE.MODEL = {}));
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="app.balancer.ts"/>
/// <reference path="app.page.utility.ts"/>
/// <reference path="../library/utility.ts"/>
/* MODEL */
var MODULE;
(function (MODULE) {
    var MODEL;
    (function (MODEL) {
        var APP;
        (function (APP) {
            var PageFetch = (function () {
                function PageFetch(model_, page_, balancer_, setting_, event_, success_, failure_) {
                    this.model_ = model_;
                    this.page_ = page_;
                    this.balancer_ = balancer_;
                    this.setting_ = setting_;
                    this.event_ = event_;
                    this.success_ = success_;
                    this.failure_ = failure_;
                    this.util_ = MODULE.LIBRARY.Utility;
                    this.main_();
                }
                PageFetch.prototype.main_ = function () {
                    var that = this, setting = this.setting_, event = this.event_ = jQuery.extend(true, {}, this.event_), wait = this.util_.fire(setting.wait, setting, [event, setting, setting.origLocation.cloneNode(), setting.destLocation.cloneNode()]);
                    var speedcheck = setting.speedcheck, speed = this.model_.speed;
                    speedcheck && (speed.fire = event.timeStamp);
                    speedcheck && speed.time.splice(0, 100, 0);
                    speedcheck && speed.name.splice(0, 100, 'pjax(' + speed.time.slice(-1) + ')');
                    var cache;
                    switch (setting.cache[event.type.toLowerCase()] && event.type.toLowerCase()) {
                        case MODULE.EVENT.CLICK:
                            cache = this.model_.getCache(setting.destLocation.href);
                            break;
                        case MODULE.EVENT.SUBMIT:
                            cache = setting.cache[event.currentTarget.method.toLowerCase()] ? this.model_.getCache(setting.destLocation.href) : cache;
                            break;
                        case MODULE.EVENT.POPSTATE:
                            cache = this.model_.getCache(setting.destLocation.href);
                            break;
                    }
                    var $xhr = this.model_.getXHR();
                    if ($xhr && $xhr.readyState < 4 && $xhr.location && this.model_.comparePageByUrl($xhr.location.href, setting.destLocation.href)) {
                        return;
                    }
                    this.dispatchEvent(document, setting.nss.event.pjax.fetch, false, false);
                    if (cache && cache.jqXHR && 200 === +cache.jqXHR.status) {
                        // cache
                        speedcheck && speed.name.splice(0, 1, 'cache(' + speed.time.slice(-1) + ')');
                        $xhr = cache.jqXHR;
                        $xhr.location = $xhr.location || setting.destLocation.cloneNode();
                        this.model_.setXHR($xhr);
                        this.page_.loadtime = 0;
                        this.host_ = this.balancer_.sanitize(cache.host, setting);
                        this.data_ = cache.jqXHR.responseText;
                        this.textStatus_ = cache.textStatus;
                        this.jqXHR_ = cache.jqXHR;
                        if (this.model_.isDeferrable) {
                            var defer = this.wait_(wait);
                            this.page_.setWait(defer);
                            jQuery.when(jQuery.Deferred().resolve(this.data_, this.textStatus_, this.jqXHR_), defer).done(done).fail(fail).always(always);
                        }
                        else {
                            var context = jQuery.extend({}, jQuery.ajaxSettings, setting.ajax);
                            context = context.context || context;
                            success.call(context, this.data_, this.textStatus_, this.jqXHR_);
                            complete.call(context, this.jqXHR_, this.textStatus_);
                        }
                    }
                    else if ($xhr && $xhr.follow && !~'error abort timeout parsererror'.indexOf($xhr.statusText)) {
                        // preload
                        speedcheck && speed.time.splice(0, 1, $xhr.timeStamp - speed.fire);
                        speedcheck && speed.name.splice(0, 1, 'preload(' + speed.time.slice(-1) + ')');
                        speedcheck && speed.time.push(speed.now() - speed.fire);
                        speedcheck && speed.name.push('continue(' + speed.time.slice(-1) + ')');
                        $xhr.location = setting.destLocation.cloneNode();
                        this.model_.setXHR($xhr);
                        this.balancer_.sanitize($xhr, setting);
                        this.balancer_.changeServer($xhr.host, setting);
                        this.host_ = this.model_.host();
                        this.page_.loadtime = $xhr.timeStamp;
                        var defer = this.wait_(wait);
                        this.page_.setWait(defer);
                        delete $xhr.timeStamp;
                        jQuery.when($xhr, defer).done(done).fail(fail).always(always);
                    }
                    else {
                        // default
                        this.page_.loadtime = event.timeStamp;
                        var requestLocation = setting.destLocation.cloneNode(), ajax = {}, callbacks = {};
                        this.balancer_.changeServer(this.balancer_.chooseServer(setting), setting);
                        this.host_ = setting.balance.active && this.model_.host().split('//').pop() || '';
                        requestLocation.host = this.host_ || setting.destLocation.host;
                        ajax.url = !setting.server.query ? requestLocation.href : [
                            requestLocation.protocol,
                            '//',
                            requestLocation.host,
                            requestLocation.pathname.replace(/^\/?/, '/'),
                            requestLocation.search.replace(/&*$/, '&' + setting.server.query).replace(/^\??&/, '?').replace(/(\?|&)$/, ''),
                            requestLocation.hash
                        ].join('');
                        switch (event.type.toLowerCase()) {
                            case MODULE.EVENT.CLICK:
                                ajax.type = 'GET';
                                break;
                            case MODULE.EVENT.SUBMIT:
                                ajax.type = event.currentTarget.method.toUpperCase();
                                switch (ajax.type) {
                                    case 'POST':
                                        if (!jQuery(event.currentTarget).has(':file').length) {
                                            ajax.data = jQuery(event.currentTarget).serializeArray();
                                        }
                                        else if ('function' === typeof FormData) {
                                            // Correspond to bug of TypeScript 1.1.0-1
                                            ajax.data = (new FormData)(event.currentTarget);
                                            ajax.contentType = false;
                                            ajax.processData = false;
                                        }
                                        break;
                                    case 'GET':
                                        break;
                                }
                                break;
                            case MODULE.EVENT.POPSTATE:
                                ajax.type = 'GET';
                                break;
                        }
                        ajax = jQuery.extend({}, setting.ajax, ajax, {
                            xhr: !setting.callbacks.ajax.xhr ? undefined : function () {
                                var $xhr;
                                $xhr = that.util_.fire(setting.callbacks.ajax.xhr, this, [event, setting]);
                                $xhr = 'object' === typeof $xhr ? $xhr : jQuery.ajaxSettings.xhr();
                                //if ($xhr instanceof Object && $xhr instanceof window.XMLHttpRequest && 'onprogress' in $xhr) {
                                //  $xhr.addEventListener('progress', function(event) {dataSize = event.loaded;}, false);
                                //}
                                return $xhr;
                            },
                            beforeSend: !setting.callbacks.ajax.beforeSend && !setting.server.header ? undefined : function ($xhr, ajaxSetting) {
                                if (setting.server.header) {
                                    $xhr.setRequestHeader(setting.nss.requestHeader, 'true');
                                }
                                if ('object' === typeof setting.server.header) {
                                    $xhr.setRequestHeader(setting.nss.requestHeader, 'true');
                                    setting.server.header.area && $xhr.setRequestHeader(setting.nss.requestHeader + '-Area', this.app_.chooseArea(setting.area, document, document));
                                    setting.server.header.head && $xhr.setRequestHeader(setting.nss.requestHeader + '-Head', setting.load.head);
                                    setting.server.header.css && $xhr.setRequestHeader(setting.nss.requestHeader + '-CSS', setting.load.css.toString());
                                    setting.server.header.script && $xhr.setRequestHeader(setting.nss.requestHeader + '-Script', setting.load.script.toString());
                                }
                                that.util_.fire(setting.callbacks.ajax.beforeSend, this, [event, setting, $xhr, ajaxSetting]);
                            },
                            dataFilter: !setting.callbacks.ajax.dataFilter ? undefined : function (data, type) {
                                return that.util_.fire(setting.callbacks.ajax.dataFilter, this, [event, setting, data, type]) || data;
                            },
                            success: this.model_.isDeferrable ? null : success,
                            error: this.model_.isDeferrable ? null : error,
                            complete: this.model_.isDeferrable ? null : complete
                        });
                        $xhr = jQuery.ajax(ajax);
                        $xhr.location = setting.destLocation.cloneNode();
                        this.model_.setXHR($xhr);
                        this.balancer_.sanitize($xhr, setting);
                        if (!this.model_.isDeferrable) {
                            return;
                        }
                        var defer = this.wait_(wait);
                        this.page_.setWait(defer);
                        jQuery.when(this.model_.getXHR(), defer).done(done).fail(fail).always(always);
                    }
                    function success(data, textStatus, $xhr) {
                        return done.call(this, [].slice.call(arguments), undefined);
                    }
                    function error($xhr, textStatus, errorThrown) {
                        return fail.apply(this, arguments);
                    }
                    function complete($xhr, textStatus) {
                        return always.apply(this, arguments);
                    }
                    function done(ajax, wait) {
                        if (!arguments.length || !arguments[0]) {
                            return;
                        }
                        that.data_ = ajax[0];
                        that.textStatus_ = ajax[1];
                        that.jqXHR_ = ajax[2];
                        that.util_.fire(setting.callbacks.ajax.success, this[0] || this, [event, setting, that.data_, that.textStatus_, that.jqXHR_]);
                    }
                    function fail($xhr, textStatus, errorThrown) {
                        if (!arguments.length || !arguments[0]) {
                            return;
                        }
                        that.jqXHR_ = $xhr;
                        that.textStatus_ = textStatus;
                        that.errorThrown_ = errorThrown;
                        that.util_.fire(setting.callbacks.ajax.error, this[0] || this, [event, setting, that.jqXHR_, that.textStatus_, that.errorThrown_]);
                    }
                    function always() {
                        if (!arguments.length || !arguments[0]) {
                            return;
                        }
                        that.util_.fire(setting.callbacks.ajax.complete, this[0] || this, [event, setting, that.jqXHR_, that.textStatus_]);
                        that.model_.setXHR(null);
                        if (200 === +that.jqXHR_.status) {
                            that.model_.setCache(setting.destLocation.href, cache && cache.data || null, that.textStatus_, that.jqXHR_);
                            that.success_(setting, event, that.data_, that.textStatus_, that.jqXHR_, that.host_);
                        }
                        else {
                            that.failure_(setting, event, that.data_, that.textStatus_, that.jqXHR_, that.host_);
                        }
                    }
                };
                PageFetch.prototype.wait_ = function (ms) {
                    var defer = jQuery.Deferred();
                    if (!ms) {
                        return defer.resolve();
                    }
                    setTimeout(function () {
                        defer.resolve();
                    }, ms);
                    return defer;
                };
                PageFetch.prototype.chooseArea = function (areas, srcDocument, dstDocument) {
                    return;
                };
                PageFetch.prototype.dispatchEvent = function (target, eventType, bubbling, cancelable) {
                };
                return PageFetch;
            })();
            APP.PageFetch = PageFetch;
        })(APP = MODEL.APP || (MODEL.APP = {}));
    })(MODEL = MODULE.MODEL || (MODULE.MODEL = {}));
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="app.page.record.ts"/>
/// <reference path="app.page.fetch.ts"/>
/* MODEL */
var MODULE;
(function (MODULE) {
    var MODEL;
    (function (MODEL) {
        var APP;
        (function (APP) {
            var PageProvider = (function () {
                function PageProvider(Record_, model_, balancer_, page_) {
                    this.Record_ = Record_;
                    this.model_ = model_;
                    this.balancer_ = balancer_;
                    this.page_ = page_;
                    this.hash_ = function (setting) { return setting.nss.url; };
                    this.table_ = {};
                    this.order_ = [];
                    this.fetch_ = APP.PageFetch;
                }
                PageProvider.prototype.fetchRecord = function (setting, event, success, failure) {
                    if (this.getRecord(setting).state(setting)) {
                        //success(this.getRecord(setting), event);
                        this.pullRecord(setting, event, success, failure);
                    }
                    else {
                        this.pullRecord(setting, event, success, failure);
                    }
                };
                PageProvider.prototype.pullRecord = function (setting, event, success, failure) {
                    var _this = this;
                    new this.fetch_(this.model_, this.page_, this.balancer_, setting, event, 
                    // success
                    function (setting, event, data, textStatus, jqXHR, host) {
                        var record = _this.setRecord(setting, _this.getRecord(setting).data.data() || '', textStatus, jqXHR, host);
                        success(record, setting, event);
                    }, 
                    // failure
                    function (setting, event, data, textStatus, jqXHR, host) {
                        var record = _this.setRecord(setting, _this.getRecord(setting).data.data() || '', textStatus, jqXHR, host);
                        failure(record, setting, event);
                    });
                };
                PageProvider.prototype.getRecord = function (setting) {
                    return this.table_[this.hash_(setting)] = this.table_[this.hash_(setting)] || new this.Record_();
                };
                PageProvider.prototype.setRecord = function (setting, data, textStatus, jqXHR, host) {
                    this.cleanRecords_(setting);
                    this.addOrder_(setting);
                    return this.table_[this.hash_(setting)] = new this.Record_(setting.nss.url, data, textStatus, jqXHR, host);
                };
                PageProvider.prototype.removeRecord = function (setting) {
                    this.removeOrder_(setting);
                    return this.table_[this.hash_(setting)] = new this.Record_();
                };
                PageProvider.prototype.clearRecord = function () {
                    this.order_.splice(0, this.order_.length);
                    for (var i in this.table_) {
                        delete this.table_[i];
                    }
                };
                PageProvider.prototype.cleanRecords_ = function (setting) {
                    if (setting.cache.limit) {
                        while (this.order_.length >= setting.cache.limit) {
                            this.removeRecord(this.order_.pop());
                        }
                    }
                    //for (var i = 0, hash: string, record: PageRecordInterface; hash = this.order_[i];) {
                    //  record = this.getRecord(this.app_.configure(hash));
                    //  !record.state() && this.removeRecord(this.app_.configure(hash));
                    //}
                };
                PageProvider.prototype.addOrder_ = function (setting) {
                    this.removeOrder_(setting);
                    this.order_.unshift(setting);
                };
                PageProvider.prototype.removeOrder_ = function (setting) {
                    for (var i = this.order_.length; i--;) {
                        this.order_[i].nss.url === setting.nss.url && this.order_.splice(i, 1);
                    }
                };
                return PageProvider;
            })();
            APP.PageProvider = PageProvider;
        })(APP = MODEL.APP || (MODEL.APP = {}));
    })(MODEL = MODULE.MODEL || (MODULE.MODEL = {}));
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="app.data.ts"/>
/// <reference path="app.balancer.ts"/>
/// <reference path="app.page.utility.ts"/>
/// <reference path="../library/utility.ts"/>
/* MODEL */
var MODULE;
(function (MODULE) {
    var MODEL;
    (function (MODEL) {
        var APP;
        (function (APP) {
            var PageUpdate = (function () {
                function PageUpdate(model_, page_, data_, balancer_, setting_, event_, record_) {
                    this.model_ = model_;
                    this.page_ = page_;
                    this.data_ = data_;
                    this.balancer_ = balancer_;
                    this.setting_ = setting_;
                    this.event_ = event_;
                    this.record_ = record_;
                    this.util_ = MODULE.LIBRARY.Utility;
                    this.loadwaits_ = [];
                    this.main_();
                }
                PageUpdate.prototype.main_ = function () {
                    var record = this.record_, setting = this.setting_, event = this.event_;
                    var speedcheck = setting.speedcheck, speed = this.model_.speed;
                    speedcheck && speed.time.push(speed.now() - speed.fire);
                    speedcheck && speed.name.push('fetch(' + speed.time.slice(-1) + ')');
                    ++this.page_.count;
                    this.page_.loadtime = this.page_.loadtime && new Date().getTime() - this.page_.loadtime;
                    if (setting.cache.mix && MODULE.EVENT.POPSTATE !== event.type.toLowerCase() && new Date().getTime() - event.timeStamp <= setting.cache.mix) {
                        return this.model_.fallback(event);
                    }
                    try {
                        this.page_.landing = null;
                        if (!~(record.data.jqXHR().getResponseHeader('Content-Type') || '').toLowerCase().search(setting.contentType)) {
                            throw new Error("throw: content-type mismatch");
                        }
                        /* variable define */
                        this.srcDocument_ = this.page_.parser.parse(record.data.jqXHR().responseText, setting.destLocation.href);
                        this.dstDocument_ = document;
                        // 更新範囲を選出
                        this.area_ = this.chooseArea(setting.area, this.srcDocument_, this.dstDocument_);
                        if (!this.area_) {
                            throw new Error('throw: area notfound');
                        }
                        // 更新範囲をセレクタごとに分割
                        this.areas_ = this.area_.match(/(?:[^,]+?|\(.*?\)|\[.*?\])+/g);
                        speedcheck && speed.time.push(speed.now() - speed.fire);
                        speedcheck && speed.name.push('parse(' + speed.time.slice(-1) + ')');
                        this.redirect_();
                        this.dispatchEvent(window, setting.nss.event.pjax.unload, false, false);
                        this.url_();
                        if (!this.model_.comparePageByUrl(setting.destLocation.href, window.location.href)) {
                            throw new Error("throw: location mismatch");
                        }
                        this.document_();
                    }
                    catch (err) {
                        if (!err) {
                            return;
                        }
                        this.model_.getCache(window.location.href) && this.model_.removeCache(setting.destLocation.href);
                        this.model_.fallback(event);
                    }
                };
                PageUpdate.prototype.isRegister_ = function (setting, event) {
                    switch (true) {
                        case setting.destLocation.href === setting.origLocation.href:
                        case MODULE.EVENT.POPSTATE === event.type.toLowerCase():
                            return false;
                        default:
                            return true;
                    }
                };
                PageUpdate.prototype.isCacheUsable_ = function (event, setting) {
                    switch (true) {
                        case !setting.cache.click && !setting.cache.submit && !setting.cache.popstate:
                        case MODULE.EVENT.SUBMIT === event.type.toLowerCase() && !setting.cache[event.currentTarget.method.toLowerCase()]:
                            return false;
                        default:
                            return true;
                    }
                };
                PageUpdate.prototype.redirect_ = function () {
                    var _this = this;
                    var setting = this.setting_, event = this.event_;
                    var url = (jQuery('head meta[http-equiv="Refresh"][content*="URL="]').attr('content') || '').match(/\w+:\/\/[^;\s"']+|$/i).shift();
                    if (!url || this.model_.comparePageByUrl(setting.destLocation.href, url)) {
                        return;
                    }
                    var redirect = setting.destLocation.cloneNode();
                    redirect.href = url;
                    if (this.util_.fire(setting.callbacks.update.redirect.before, setting, [event, setting, redirect.cloneNode(), setting.origLocation.cloneNode(), setting.destLocation.cloneNode()]) === false) {
                        return;
                    }
                    ;
                    switch (true) {
                        case !setting.redirect:
                        case redirect.protocol !== setting.destLocation.protocol:
                        case redirect.host !== setting.destLocation.host:
                        case MODULE.EVENT.SUBMIT === event.type.toLowerCase() && 'GET' !== event.currentTarget.method.toUpperCase():
                            switch (event.type.toLowerCase()) {
                                case MODULE.EVENT.CLICK:
                                case MODULE.EVENT.SUBMIT:
                                    window.location.assign(redirect.href);
                                    break;
                                case MODULE.EVENT.POPSTATE:
                                    window.location.replace(redirect.href);
                                    break;
                            }
                            throw false;
                        default:
                            jQuery[MODULE.DEF.NAME].enable();
                            switch (event.type.toLowerCase()) {
                                case MODULE.EVENT.CLICK:
                                case MODULE.EVENT.SUBMIT:
                                    setTimeout(function () { return jQuery[MODULE.DEF.NAME].click(redirect.href); }, 0);
                                    break;
                                case MODULE.EVENT.POPSTATE:
                                    window.history.replaceState(window.history.state, this.srcDocument_.title, redirect.href);
                                    if (this.isRegister_(setting, event) && setting.fix.location && !this.util_.compareUrl(setting.destLocation.href, window.location.href)) {
                                        jQuery[MODULE.DEF.NAME].disable();
                                        window.history.back();
                                        window.history.forward();
                                        jQuery[MODULE.DEF.NAME].enable();
                                    }
                                    setTimeout(function () { return _this.dispatchEvent(window, MODULE.EVENT.POPSTATE, false, false); }, 0);
                                    break;
                            }
                            throw false;
                    }
                    if (this.util_.fire(setting.callbacks.update.redirect.after, setting, [event, setting, redirect.cloneNode(), setting.origLocation.cloneNode(), setting.destLocation.cloneNode()]) === false) {
                        return;
                    }
                };
                PageUpdate.prototype.url_ = function () {
                    var setting = this.setting_, event = this.event_;
                    this.model_.location.href = setting.destLocation.href;
                    if (this.util_.fire(setting.callbacks.update.url.before, setting, [event, setting, setting.origLocation.cloneNode(), setting.destLocation.cloneNode()]) === false) {
                        return;
                    }
                    ;
                    if (this.isRegister_(setting, event)) {
                        window.history.pushState(this.util_.fire(setting.state, setting, [event, setting, setting.origLocation.cloneNode(), setting.destLocation.cloneNode()]), ~window.navigator.userAgent.toLowerCase().indexOf('opera') ? this.dstDocument_.title : this.srcDocument_.title, setting.destLocation.href);
                        if (setting.fix.location && !this.util_.compareUrl(setting.destLocation.href, window.location.href)) {
                            jQuery[MODULE.DEF.NAME].disable();
                            window.history.back();
                            window.history.forward();
                            jQuery[MODULE.DEF.NAME].enable();
                        }
                    }
                    if (this.util_.fire(setting.callbacks.update.url.after, setting, [event, setting, setting.origLocation.cloneNode(), setting.destLocation.cloneNode()]) === false) {
                        return;
                    }
                };
                PageUpdate.prototype.document_ = function () {
                    var _this = this;
                    var setting = this.setting_, event = this.event_;
                    if (setting.load.script && !this.page_.loadedScripts['']) {
                        var loadedScripts = this.page_.loadedScripts;
                        loadedScripts[''] = true;
                        jQuery('script').each(function () {
                            var element = this;
                            if (element.src) {
                                loadedScripts[element.src] = !setting.load.reload || !jQuery(element).is(setting.load.reload);
                            }
                        });
                    }
                    this.overwriteDocumentByCache_();
                    setting.fix.noscript && this.escapeNoscript_(this.srcDocument_);
                    setting.fix.reference && this.fixReference_(setting.origLocation.href, this.dstDocument_);
                    this.rewrite_();
                    this.title_();
                    setting.fix.history && this.data_.saveTitle();
                    this.data_.saveExpires(this.record_.data.url(), this.record_.data.host(), this.record_.data.expires());
                    this.head_();
                    var speedcheck = setting.speedcheck, speed = this.model_.speed;
                    speedcheck && speed.time.push(speed.now() - speed.fire);
                    speedcheck && speed.name.push('head(' + speed.time.slice(-1) + ')');
                    this.content_();
                    speedcheck && speed.time.push(speed.now() - speed.fire);
                    speedcheck && speed.name.push('content(' + speed.time.slice(-1) + ')');
                    this.balance_();
                    this.css_('link[rel~="stylesheet"], style');
                    jQuery(window).one(MODULE.DEF.NAME + ':rendering', function (e) {
                        e.preventDefault();
                        e.stopImmediatePropagation();
                        var onready = function (callback) {
                            if (!_this.model_.comparePageByUrl(setting.destLocation.href, window.location.href)) {
                                return;
                            }
                            _this.dispatchEvent(document, setting.nss.event.pjax.ready, false, false);
                            jQuery(_this.area_).each(function (i, elem) { return jQuery(elem).width(); });
                            return jQuery.when ? jQuery.Deferred().resolve() : callback();
                        };
                        var onrender = function (callback) {
                            if (!_this.model_.comparePageByUrl(setting.destLocation.href, window.location.href)) {
                                return;
                            }
                            _this.util_.fire(setting.callback, setting, [event, setting]);
                            setTimeout(function () {
                                switch (event.type.toLowerCase()) {
                                    case MODULE.EVENT.CLICK:
                                    case MODULE.EVENT.SUBMIT:
                                        _this.model_.overlay(setting) || _this.scrollByHash_(setting) || _this.scroll_(true);
                                        break;
                                    case MODULE.EVENT.POPSTATE:
                                        _this.model_.overlay(setting) || _this.scroll_(true);
                                        break;
                                }
                            }, 100);
                            _this.dispatchEvent(document, setting.nss.event.pjax.render, false, false);
                            speedcheck && speed.time.push(speed.now() - speed.fire);
                            speedcheck && speed.name.push('render(' + speed.time.slice(-1) + ')');
                            return jQuery.when ? jQuery.when.apply(jQuery, _this.loadwaits_) : callback();
                        };
                        var onload = function () {
                            if (!_this.model_.comparePageByUrl(setting.destLocation.href, window.location.href)) {
                                return jQuery.when && jQuery.Deferred().reject();
                            }
                            _this.dispatchEvent(window, setting.nss.event.pjax.load, false, false);
                            speedcheck && speed.time.push(speed.now() - speed.fire);
                            speedcheck && speed.name.push('load(' + speed.time.slice(-1) + ')');
                            speedcheck && console.log(speed.time);
                            speedcheck && console.log(speed.name);
                            _this.script_('[src][defer]');
                            // 未定義を返すとエラー
                            return jQuery.when && jQuery.Deferred().resolve();
                        };
                        _this.scroll_(false);
                        if (100 > _this.page_.loadtime && setting.reset.type.match(event.type.toLowerCase()) && !jQuery('form[method][method!="GET"]').length) {
                            switch (false) {
                                case _this.page_.count < setting.reset.count || !setting.reset.count:
                                case new Date().getTime() < setting.reset.time + _this.page_.time || !setting.reset.time:
                                    throw new Error('throw: reset');
                            }
                        }
                        var scriptwaits = _this.script_(':not([defer]), :not([src])');
                        if (jQuery.when) {
                            // 1.7.2のthenは壊れてるのでpipe
                            var then = jQuery.Deferred().pipe ? 'pipe' : 'then';
                            jQuery.when.apply(jQuery, scriptwaits)[then](function () { return onready(); })[then](function () { return onrender(); })[then](function () { return onload(); });
                        }
                        else {
                            onready(function () { return onrender(function () { return onload(); }); });
                        }
                    }).trigger(MODULE.DEF.NAME + ':rendering');
                };
                PageUpdate.prototype.overwriteDocumentByCache_ = function () {
                    var setting = this.setting_, event = this.event_, cache = this.model_.getCache(setting.destLocation.href);
                    if (!this.isCacheUsable_(event, setting)) {
                        return;
                    }
                    if (cache && cache.data) {
                        var html = setting.fix.noscript ? this.restoreNoscript_(cache.data) : cache.data, cacheDocument = this.page_.parser.parse(html, setting.destLocation.href), srcDocument = this.srcDocument_;
                        srcDocument.title = cacheDocument.title;
                        var $srcAreas, $dstAreas;
                        for (var i = 0; this.areas_[i]; i++) {
                            $srcAreas = jQuery(this.areas_[i], cacheDocument).clone();
                            $dstAreas = jQuery(this.areas_[i], srcDocument);
                            if (!$srcAreas.length || !$dstAreas.length || $srcAreas.length !== $dstAreas.length) {
                                throw new Error('throw: area mismatch');
                            }
                            for (var j = 0; $srcAreas[j]; j++) {
                                $dstAreas[j].parentNode.replaceChild($srcAreas[j], $dstAreas[j]);
                            }
                        }
                    }
                };
                PageUpdate.prototype.rewrite_ = function () {
                    var setting = this.setting_, event = this.event_;
                    if (!setting.rewrite) {
                        return;
                    }
                    if (this.util_.fire(setting.callbacks.update.rewrite.before, setting, [event, setting, this.srcDocument_, this.dstDocument_]) === false) {
                        return;
                    }
                    this.util_.fire(setting.rewrite, setting, [this.srcDocument_, this.area_, this.record_.data.host()]);
                    if (this.util_.fire(setting.callbacks.update.rewrite.before, setting, [event, setting, this.srcDocument_, this.dstDocument_]) === false) {
                        return;
                    }
                };
                PageUpdate.prototype.title_ = function () {
                    var setting = this.setting_, event = this.event_;
                    if (this.util_.fire(setting.callbacks.update.title.before, setting, [event, setting, this.srcDocument_.title, this.dstDocument_.title]) === false) {
                        return;
                    }
                    this.dstDocument_.title = this.srcDocument_.title;
                    if (this.util_.fire(setting.callbacks.update.title.after, setting, [event, setting, this.srcDocument_.title, this.dstDocument_.title]) === false) {
                        return;
                    }
                };
                PageUpdate.prototype.head_ = function () {
                    var setting = this.setting_, event = this.event_, srcDocument = this.srcDocument_, dstDocument = this.dstDocument_;
                    if (!setting.load.head) {
                        return;
                    }
                    if (this.util_.fire(setting.callbacks.update.head.before, setting, [event, setting, this.srcDocument_.querySelector('head'), this.dstDocument_.querySelector('head')]) === false) {
                        return;
                    }
                    var prefilter = 'base, meta, link', $srcElements = jQuery(srcDocument.head).children(prefilter).filter(setting.load.head).not(setting.load.ignore).not('link[rel~="stylesheet"], style, script'), $dstElements = jQuery(dstDocument.head).children(prefilter).filter(setting.load.head).not(setting.load.ignore).not('link[rel~="stylesheet"], style, script'), $addElements = jQuery(), $delElements = $dstElements;
                    for (var i = 0, element, selector; element = $srcElements[i]; i++) {
                        for (var j = 0; $delElements[j]; j++) {
                            if ($delElements[j].tagName === element.tagName && $delElements[j].outerHTML === element.outerHTML) {
                                if ($addElements.length) {
                                    var ref = $dstElements[$dstElements.index($delElements[j]) - 1];
                                    ref ? jQuery(ref).after($addElements.clone()) : $delElements.eq(j).before($addElements.clone());
                                    $addElements = jQuery();
                                }
                                $delElements = $delElements.not($delElements[j]);
                                element = null;
                                break;
                            }
                        }
                        $addElements = $addElements.add(element);
                    }
                    jQuery('title', dstDocument).before($addElements.clone());
                    $delElements.remove();
                    if (this.util_.fire(setting.callbacks.update.head.after, setting, [event, setting, this.srcDocument_.querySelector('head'), this.dstDocument_.querySelector('head')]) === false) {
                        return;
                    }
                };
                PageUpdate.prototype.content_ = function () {
                    var _this = this;
                    var setting = this.setting_, event = this.event_, srcDocument = this.srcDocument_, dstDocument = this.dstDocument_;
                    if (this.util_.fire(setting.callbacks.update.content.before, setting, [event, setting, jQuery(this.area_, this.srcDocument_).get(), jQuery(this.area_, this.dstDocument_).get()]) === false) {
                        return;
                    }
                    function map() {
                        var defer = jQuery.Deferred();
                        jQuery(this).one('load error abort', defer.resolve);
                        return defer;
                    }
                    jQuery(this.area_).children('.' + setting.nss.elem + '-check').remove();
                    var $srcAreas, $dstAreas;
                    for (var i = 0; this.areas_[i]; i++) {
                        $srcAreas = jQuery(this.areas_[i], srcDocument).clone();
                        $dstAreas = jQuery(this.areas_[i], dstDocument);
                        if (!$srcAreas.length || !$dstAreas.length || $srcAreas.length !== $dstAreas.length) {
                            throw new Error('throw: area mismatch');
                        }
                        $srcAreas.find('script').each(function (i, elem) { return _this.escapeScript_(elem); });
                        if (jQuery.when) {
                            this.loadwaits_ = this.loadwaits_.concat($srcAreas.find('img, iframe, frame').map(map).get());
                        }
                        for (var j = 0; $srcAreas[j]; j++) {
                            $dstAreas[j].parentNode.replaceChild($srcAreas[j], $dstAreas[j]);
                            if (document.body === $srcAreas[j]) {
                                jQuery.each($srcAreas[j].attributes, function (i, attr) { return $dstAreas[j].removeAttribute(attr.name); });
                                jQuery.each($srcAreas[j].attributes, function (i, attr) { return $dstAreas[j].setAttribute(attr.name, attr.value); });
                            }
                        }
                        $dstAreas = jQuery(this.areas_[i], dstDocument);
                        $dstAreas.find('script').each(function (i, elem) { return _this.restoreScript_(elem); });
                    }
                    this.dispatchEvent(document, setting.nss.event.pjax.DOMContentLoaded, false, false);
                    if (this.util_.fire(setting.callbacks.update.content.after, setting, [event, setting, jQuery(this.area_, this.srcDocument_).get(), jQuery(this.area_, this.dstDocument_).get()]) === false) {
                        return;
                    }
                };
                PageUpdate.prototype.balance_ = function () {
                    var setting = this.setting_, event = this.event_;
                    if (!setting.balance.active || this.page_.loadtime < 100) {
                        return;
                    }
                    var $xhr = this.record_.data.jqXHR();
                    var host = this.balancer_.sanitize($xhr, setting) || this.record_.data.host() || '', time = this.page_.loadtime, score = this.balancer_.score(time, $xhr.responseText.length);
                    if (this.util_.fire(setting.callbacks.update.balance.before, setting, [event, setting, host, this.page_.loadtime, $xhr.responseText.length]) === false) {
                        return;
                    }
                    var server = this.data_.getServerBuffer(setting.destLocation.href), score = this.balancer_.score(time, $xhr.responseText.length);
                    time = server && !server.state && server.time ? Math.round((server.time + time) / 2) : time;
                    score = server && !server.state && server.score ? Math.round((server.score + score) / 2) : score;
                    this.data_.saveServer(host, new Date().getTime() + setting.balance.server.expires, time, score, 0);
                    this.balancer_.changeServer(this.balancer_.chooseServer(setting), setting);
                    if (this.util_.fire(setting.callbacks.update.balance.after, setting, [event, setting, host, this.page_.loadtime, $xhr.responseText.length]) === false) {
                        return;
                    }
                };
                PageUpdate.prototype.css_ = function (selector) {
                    var setting = this.setting_, event = this.event_, srcDocument = this.srcDocument_, dstDocument = this.dstDocument_;
                    if (!setting.load.css) {
                        return;
                    }
                    var prefilter = 'link, style', $srcElements = jQuery(prefilter, srcDocument).filter(selector).not(jQuery('noscript', srcDocument).find(prefilter)), $dstElements = jQuery(prefilter, dstDocument).filter(selector).not(jQuery('noscript', srcDocument).find(prefilter)), $addElements = jQuery(), $delElements = $dstElements;
                    if (this.util_.fire(setting.callbacks.update.css.before, setting, [event, setting, $srcElements.get(), $dstElements.get()]) === false) {
                        return;
                    }
                    $srcElements = $srcElements.not(setting.load.ignore);
                    $dstElements = $srcElements.not(setting.load.ignore);
                    function filterHeadContent() {
                        return jQuery.contains(srcDocument.head, this);
                    }
                    function filterBodyContent() {
                        return jQuery.contains(srcDocument.body, this);
                    }
                    for (var i = 0, element; element = $srcElements[i]; i++) {
                        for (var j = 0, isSameElement; $delElements[j]; j++) {
                            switch (element.tagName.toLowerCase()) {
                                case 'link':
                                    isSameElement = element.href === $delElements[j].href;
                                    break;
                                case 'style':
                                    isSameElement = this.util_.trim(element.innerHTML) === this.util_.trim($delElements[j].innerHTML);
                                    break;
                            }
                            if (isSameElement) {
                                if ($addElements.length) {
                                    if (jQuery.contains(dstDocument.body, $delElements[j]) && $addElements.first().parents('head').length) {
                                        jQuery(dstDocument.head).append($addElements.filter(filterHeadContent).clone());
                                        $delElements.eq(j).before($addElements.filter(filterBodyContent).clone());
                                    }
                                    else {
                                        var ref = $dstElements[$dstElements.index($delElements[j]) - 1];
                                        ref ? jQuery(ref).after($addElements.clone()) : $delElements.eq(j).before($addElements.clone());
                                    }
                                    $addElements = jQuery();
                                }
                                $delElements = $delElements.not($delElements[j]);
                                j -= Number(!!j);
                                element = null;
                                break;
                            }
                        }
                        $addElements = $addElements.add(element);
                    }
                    jQuery(dstDocument.head).append($addElements.filter(filterHeadContent).clone());
                    jQuery(dstDocument.body).append($addElements.filter(filterBodyContent).clone());
                    $delElements.remove();
                    $dstElements = jQuery(prefilter, dstDocument).filter(selector).not(jQuery('noscript', srcDocument).find(prefilter));
                    if (this.util_.fire(setting.callbacks.update.css.after, setting, [event, setting, $srcElements.get(), $dstElements.get()]) === false) {
                        return;
                    }
                    var speedcheck = setting.speedcheck, speed = this.model_.speed;
                    speedcheck && speed.time.push(speed.now() - speed.fire);
                    speedcheck && speed.name.push('css(' + speed.time.slice(-1) + ')');
                };
                PageUpdate.prototype.script_ = function (selector) {
                    var _this = this;
                    var setting = this.setting_, event = this.event_, srcDocument = this.srcDocument_, dstDocument = this.dstDocument_;
                    var scriptwaits = [], scripts = [];
                    if (!setting.load.script) {
                        return scriptwaits;
                    }
                    var prefilter = 'script', $srcElements = jQuery(prefilter, srcDocument).filter(selector).not(jQuery('noscript', srcDocument).find(prefilter)), $dstElements = jQuery(prefilter, dstDocument).filter(selector).not(jQuery('noscript', dstDocument).find(prefilter)), loadedScripts = this.page_.loadedScripts, regType = /^$|(?:application|text)\/(?:java|ecma)script/i, regRemove = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
                    if (this.util_.fire(setting.callbacks.update.script.before, setting, [event, setting, $srcElements.get(), $dstElements.get()]) === false) {
                        return scriptwaits;
                    }
                    $srcElements = $srcElements.not(setting.load.ignore);
                    var exec = function (element, response) {
                        if (!_this.model_.comparePageByUrl(setting.destLocation.href, window.location.href)) {
                            return false;
                        }
                        if (element.src) {
                            loadedScripts[element.src] = !setting.load.reload || !jQuery(element).is(setting.load.reload);
                        }
                        try {
                            if (_this.model_.isDeferrable) {
                                if ('string' === typeof response) {
                                    eval.call(window, response);
                                }
                                else {
                                    throw response;
                                }
                            }
                            else {
                                if (element.hasAttribute('src')) {
                                    jQuery.ajax(jQuery.extend(true, {}, setting.ajax, setting.load.ajax, {
                                        url: element.src,
                                        dataType: 'script',
                                        async: false,
                                        global: false,
                                        success: function () { return null; },
                                        error: function (err) {
                                            throw err;
                                        }
                                    }));
                                }
                                else {
                                    eval.call(window, (element.text || element.textContent || element.innerHTML || '').replace(regRemove, ''));
                                }
                            }
                            try {
                                element.hasAttribute('src') && _this.dispatchEvent(element, 'load', false, false);
                            }
                            catch (e) {
                            }
                        }
                        catch (err) {
                            try {
                                element.hasAttribute('src') && _this.dispatchEvent(element, 'error', false, false);
                            }
                            catch (e) {
                            }
                            if (true === setting.load.error) {
                                throw err;
                            }
                            else {
                                _this.util_.fire(setting.load.error, setting, [err, element]);
                            }
                        }
                    };
                    for (var i = 0, element; element = $srcElements[i]; i++) {
                        if (!regType.test(element.type || '')) {
                            continue;
                        }
                        if (element.hasAttribute('src') ? loadedScripts[element.src] : !this.util_.trim(element.innerHTML)) {
                            continue;
                        }
                        LOG: {
                            var srcLogParent = jQuery(element).parent(setting.load.log)[0];
                            if (!srcLogParent || jQuery(element).parents(this.area_).length) {
                                break LOG;
                            }
                            var dstLogParent = jQuery(srcLogParent.id || srcLogParent.tagName, dstDocument)[0], log = element.cloneNode(true);
                            this.escapeScript_(log);
                            dstLogParent.appendChild(log);
                            this.restoreScript_(log);
                        }
                        ;
                        // リストアップ
                        (function (element) {
                            var defer = _this.model_.isDeferrable && jQuery.Deferred();
                            if (element.hasAttribute('src') && element.getAttribute('src')) {
                                loadedScripts[element.src] = !setting.load.reload || !jQuery(element).is(setting.load.reload);
                                if (element.hasAttribute('async')) {
                                    jQuery.ajax(jQuery.extend({}, setting.ajax, setting.load.ajax, {
                                        url: element.src,
                                        dataType: 'script',
                                        async: true,
                                        global: false,
                                        success: function () { return _this.dispatchEvent(element, 'load', false, false); },
                                        error: function () { return _this.dispatchEvent(element, 'error', false, false); }
                                    }));
                                }
                                else {
                                    if (defer) {
                                        jQuery.ajax(jQuery.extend({}, setting.ajax, setting.load.ajax, {
                                            url: element.src,
                                            dataType: 'text',
                                            async: true,
                                            global: false,
                                            success: function () { return defer.resolve([element, arguments[0]]); },
                                            error: function (err) { return defer.resolve([element, err]); }
                                        }));
                                        scriptwaits.push(defer);
                                    }
                                    else {
                                        scripts.push(element);
                                    }
                                }
                            }
                            else if (!element.hasAttribute('src')) {
                                if (defer) {
                                    scriptwaits.push(defer.resolve([element, (element.text || element.textContent || element.innerHTML || '').replace(regRemove, '')]));
                                }
                                else {
                                    scripts.push(element);
                                }
                            }
                        })(element);
                    }
                    try {
                        if (this.model_.isDeferrable) {
                            jQuery.when.apply(jQuery, scriptwaits).always(function () { return jQuery.each(arguments, function (i, args) { return exec.apply(_this, args); }); });
                        }
                        else {
                            jQuery.each(scripts, function (i, elem) { return exec(elem); });
                        }
                    }
                    catch (err) {
                        setTimeout(function () { return _this.model_.fallback(event); }, 1);
                        throw err;
                    }
                    $dstElements = jQuery(prefilter, dstDocument).filter(selector).not(jQuery('noscript', dstDocument).find(prefilter));
                    if (this.util_.fire(setting.callbacks.update.script.after, setting, [event, setting, $srcElements.get(), $dstElements.get()]) === false) {
                        return scriptwaits;
                    }
                    var speedcheck = setting.speedcheck, speed = this.model_.speed;
                    speedcheck && speed.time.push(speed.now() - speed.fire);
                    speedcheck && speed.name.push('script(' + speed.time.slice(-1) + ')');
                    return scriptwaits;
                };
                PageUpdate.prototype.scroll_ = function (call) {
                    var setting = this.setting_, event = this.event_;
                    if (this.util_.fire(setting.callbacks.update.scroll.before, setting, [event, setting]) === false) {
                        return;
                    }
                    var scrollX, scrollY;
                    switch (event.type.toLowerCase()) {
                        case MODULE.EVENT.CLICK:
                        case MODULE.EVENT.SUBMIT:
                            scrollX = call && 'function' === typeof setting.scrollLeft ? this.util_.fire(setting.scrollLeft, setting, [event, setting, setting.origLocation.cloneNode(), setting.destLocation.cloneNode()]) : setting.scrollLeft;
                            scrollX = 0 <= scrollX ? scrollX : 0;
                            scrollX = scrollX === false || scrollX === null ? jQuery(window).scrollLeft() : parseInt(Number(scrollX) + '', 10);
                            scrollY = call && 'function' === typeof setting.scrollTop ? this.util_.fire(setting.scrollTop, setting, [event, setting, setting.origLocation.cloneNode(), setting.destLocation.cloneNode()]) : setting.scrollTop;
                            scrollY = 0 <= scrollY ? scrollY : 0;
                            scrollY = scrollY === false || scrollY === null ? jQuery(window).scrollTop() : parseInt(Number(scrollY) + '', 10);
                            window.scrollTo(scrollX, scrollY);
                            break;
                        case MODULE.EVENT.POPSTATE:
                            call && setting.fix.scroll && this.data_.loadScrollPosition();
                            break;
                    }
                    call && this.data_.saveScrollPosition();
                    if (this.util_.fire(setting.callbacks.update.scroll.after, setting, [event, setting]) === false) {
                        return;
                    }
                };
                PageUpdate.prototype.scrollByHash_ = function (setting) {
                    var hash = setting.destLocation.hash.replace(/^#/, '');
                    if (!hash) {
                        return false;
                    }
                    var $hashTargetElement = jQuery('#' + hash + ', [name~=' + hash + ']').first();
                    if ($hashTargetElement.length) {
                        isFinite($hashTargetElement.offset().top) && window.scrollTo(jQuery(window).scrollLeft(), parseInt(Number($hashTargetElement.offset().top) + '', 10));
                        this.data_.saveScrollPosition();
                        return true;
                    }
                    else {
                        return false;
                    }
                };
                PageUpdate.prototype.fixReference_ = function (url, document) {
                    var origDir = url.replace(/[^/]+$/, ''), destDir = document.URL.replace(/[^/]+$/, ''), origDim = origDir.split('/').length, destDim = destDir.split('/').length;
                    var regUntilHost = /^.+?\w\//;
                    var distance = this.util_.repeat('../', Math.abs(origDim - destDim)), direction;
                    switch (true) {
                        case origDim === destDim:
                            direction = 0;
                            break;
                        case origDim < destDim:
                            direction = 1;
                            break;
                        case origDim > destDim:
                            direction = -1;
                            break;
                    }
                    jQuery('[href], [src]', document).not([
                        '[href^="/"]',
                        '[href^= "http:"]',
                        '[href^= "https:"]',
                        '[src^= "/"]',
                        '[src^= "http:"]',
                        '[src^= "https:"]'
                    ].join(',')).each(eachFixPath);
                    function eachFixPath(i, elem) {
                        var attr;
                        if ('href' in elem) {
                            attr = 'href';
                        }
                        else if ('src' in elem) {
                            attr = 'src';
                        }
                        else {
                            return;
                        }
                        switch (direction) {
                            case 0:
                                break;
                            case 1:
                                elem[attr] = distance + elem.getAttribute(attr);
                                break;
                            case -1:
                                elem[attr] = elem.getAttribute(attr).replace(distance, '');
                                break;
                        }
                        elem.setAttribute(attr, elem[attr].replace(regUntilHost, '/'));
                    }
                };
                PageUpdate.prototype.escapeNoscript_ = function (srcDocument) {
                    jQuery('noscript', srcDocument).children().parent().each(eachNoscript);
                    function eachNoscript() {
                        jQuery(this).text(this.innerHTML);
                    }
                };
                PageUpdate.prototype.restoreNoscript_ = function (html) {
                    var $span = jQuery('<span/>');
                    return html.replace(/(<noscript>)([^<>]+?)(<\/noscript>)/gim, function ($0, $1, $2, $3) { return $1 + $span.html($2).text() + $3; });
                };
                PageUpdate.prototype.escapeScript_ = function (script) {
                    jQuery.data(script, 'source', script.src);
                    jQuery.data(script, 'code', script.innerHTML);
                    script.removeAttribute('src');
                    script.innerHTML = '';
                };
                PageUpdate.prototype.restoreScript_ = function (script) {
                    if (undefined === jQuery.data(script, 'code')) {
                        return;
                    }
                    script.innerHTML = ' ';
                    if (jQuery.data(script, 'source')) {
                        script.src = jQuery.data(script, 'source');
                        jQuery.removeData(script, 'source');
                    }
                    else {
                        script.removeAttribute('src');
                    }
                    script.innerHTML = jQuery.data(script, 'code');
                    jQuery.removeData(script, 'code');
                };
                PageUpdate.prototype.chooseArea = function (areas, srcDocument, dstDocument) {
                    return;
                };
                PageUpdate.prototype.dispatchEvent = function (target, eventType, bubbling, cancelable) {
                };
                return PageUpdate;
            })();
            APP.PageUpdate = PageUpdate;
        })(APP = MODEL.APP || (MODEL.APP = {}));
    })(MODEL = MODULE.MODEL || (MODULE.MODEL = {}));
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="../library/utility.ts"/>
/* MODEL */
var MODULE;
(function (MODULE) {
    var MODEL;
    (function (MODEL) {
        var APP;
        (function (APP) {
            var PageParser = (function () {
                function PageParser() {
                }
                PageParser.prototype.test_ = function (mode) {
                    try {
                        var html = '<html lang="en" class="html"><head><title>&amp;</title><link href="/"><noscript><style>/**/</style></noscript></head><body><noscript>noscript</noscript><a href="/"></a></body></html>', doc = this.parse(html, window.location.href, mode);
                        switch (false) {
                            case !!doc:
                            case doc.URL && decodeURI(doc.URL) === decodeURI(window.location.href):
                            case doc.title === '&':
                            case !!doc.querySelector('html.html[lang="en"]'):
                            case !!doc.querySelector('head>link')['href']:
                            case !!doc.querySelector('head>noscript')['innerHTML']:
                            case !!doc.querySelector('body>noscript')['innerHTML']:
                            case !!doc.querySelector('body>a')['href']:
                                throw true;
                        }
                        return mode;
                    }
                    catch (err) {
                    }
                };
                PageParser.prototype.parse = function (html, uri, mode) {
                    if (mode === void 0) { mode = this.mode_; }
                    html += ~html.search(/<title[\s>]/i) ? '' : '<title></title>';
                    var backup = !uri || !MODULE.LIBRARY.Utility.compareUrl(uri, window.location.href) ? window.location.href : undefined;
                    backup && window.history.replaceState && window.history.replaceState(window.history.state, document.title, uri);
                    var doc;
                    switch (mode) {
                        case 'dom':
                            if ('function' === typeof window.DOMParser) {
                                doc = new window.DOMParser().parseFromString(html, 'text/html');
                            }
                            break;
                        case 'doc':
                            if (document.implementation && document.implementation.createHTMLDocument) {
                                doc = document.implementation.createHTMLDocument('');
                                // IE, Operaクラッシュ対策
                                if ('object' !== typeof doc.activeElement || !doc.activeElement) {
                                    break;
                                }
                                // titleプロパティの値をChromeで事後に変更できなくなったため事前に設定する必要がある
                                if ('function' === typeof window.DOMParser && new window.DOMParser().parseFromString('', 'text/html')) {
                                    doc.title = new window.DOMParser().parseFromString(html.match(/<title(?:\s.*?[^\\])?>(?:.*?[^\\])?<\/title>/i), 'text/html').title;
                                }
                                doc.open();
                                doc.write(html);
                                doc.close();
                                if (doc.title !== doc.querySelector('title').textContent) {
                                    doc.title = doc.querySelector('title').textContent;
                                }
                            }
                            break;
                        case 'manipulate':
                            if (document.implementation && document.implementation.createHTMLDocument) {
                                doc = manipulate(document.implementation.createHTMLDocument(''), html);
                            }
                            break;
                        case null:
                            doc = null;
                            break;
                        default:
                            switch (/webkit|firefox|trident|$/i.exec(window.navigator.userAgent.toLowerCase()).shift()) {
                                case 'webkit':
                                    this.mode_ = this.test_('doc') || this.test_('dom') || this.test_('manipulate');
                                    break;
                                case 'firefox':
                                    this.mode_ = this.test_('dom') || this.test_('doc') || this.test_('manipulate');
                                    break;
                                case 'trident':
                                    this.mode_ = this.test_('manipulate') || this.test_('dom') || this.test_('doc');
                                    break;
                                default:
                                    this.mode_ = this.test_('dom') || this.test_('doc') || this.test_('manipulate');
                            }
                            doc = this.mode_ && this.parse(html, uri);
                            break;
                    }
                    backup && window.history.replaceState && window.history.replaceState(window.history.state, document.title, backup);
                    return doc;
                    function manipulate(doc, html) {
                        var wrapper = document.createElement('div');
                        wrapper.innerHTML = html.match(/<html(?:\s.*?[^\\])?>|$/i).shift().replace(/html/i, 'div') || '<div>';
                        var attrs = wrapper.firstChild.attributes;
                        for (var i = 0, attr; attr = attrs[i]; i++) {
                            doc.documentElement.setAttribute(attr.name, attr.value);
                        }
                        var wrapper = document.createElement('html');
                        wrapper.innerHTML = html.replace(/^.*?<html(?:\s.*?[^\\])?>/im, '');
                        doc.documentElement.removeChild(doc.head);
                        doc.documentElement.removeChild(doc.body);
                        while (wrapper.childNodes.length) {
                            doc.documentElement.appendChild(wrapper.childNodes[0]);
                        }
                        return doc;
                    }
                };
                return PageParser;
            })();
            APP.PageParser = PageParser;
            var PageParserSingleton = (function () {
                function PageParserSingleton() {
                    PageParserSingleton.instance_ = PageParserSingleton.instance_ || new PageParser();
                }
                PageParserSingleton.prototype.singleton_ = function () {
                    return PageParserSingleton.instance_;
                };
                PageParserSingleton.prototype.parse = function (html, uri) {
                    return this.singleton_().parse(html, uri);
                };
                return PageParserSingleton;
            })();
            APP.PageParserSingleton = PageParserSingleton;
        })(APP = MODEL.APP || (MODEL.APP = {}));
    })(MODEL = MODULE.MODEL || (MODULE.MODEL = {}));
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="app.data.ts"/>
/// <reference path="app.balancer.ts"/>
/// <reference path="app.page.provider.ts"/>
/// <reference path="app.page.update.ts"/>
/// <reference path="app.page.parser.ts"/>
/// <reference path="app.page.utility.ts"/>
/// <reference path="../library/utility.ts"/>
/* MODEL */
var MODULE;
(function (MODULE) {
    var MODEL;
    (function (MODEL) {
        var APP;
        (function (APP) {
            MODULE.MIXIN(APP.PageFetch, [APP.PageUtility]);
            MODULE.MIXIN(APP.PageUpdate, [APP.PageUtility]);
            var Page = (function () {
                function Page(model_, data_, balancer_) {
                    var _this = this;
                    this.model_ = model_;
                    this.data_ = data_;
                    this.balancer_ = balancer_;
                    this.util_ = MODULE.LIBRARY.Utility;
                    this.parser = new APP.PageParserSingleton();
                    this.provider = new APP.PageProvider(APP.PageRecord, this.model_, this.balancer_, this);
                    this.landing = this.util_.normalizeUrl(window.location.href);
                    this.loadedScripts = {};
                    this.loadtime = 0;
                    this.count = 0;
                    this.time = new Date().getTime();
                    setTimeout(function () { return _this.parser.parse('') || _this.model_.disable(); }, 100);
                }
                Page.prototype.transfer = function (setting, event) {
                    switch (event.type.toLowerCase()) {
                        case MODULE.EVENT.CLICK:
                            this.data_.saveTitle();
                            this.data_.saveScrollPosition();
                            break;
                        case MODULE.EVENT.SUBMIT:
                            this.data_.saveTitle();
                            this.data_.saveScrollPosition();
                            break;
                        case MODULE.EVENT.POPSTATE:
                            this.data_.saveTitle(setting.origLocation.href, document.title);
                            setting.fix.history && this.data_.loadTitle();
                            break;
                    }
                    setting = jQuery.extend(true, {}, setting);
                    setting.origLocation = setting.origLocation.cloneNode();
                    setting.destLocation = setting.destLocation.cloneNode();
                    setting = MODULE.FREEZE(setting);
                    this.fetch_(setting, event);
                };
                Page.prototype.getWait = function () {
                    return this.wait_;
                };
                Page.prototype.setWait = function (task) {
                    this.wait_ && this.wait_.state && 'pending' === this.wait_.state() && this.wait_.reject();
                    return this.wait_ = task;
                };
                Page.prototype.fetch_ = function (setting, event) {
                    var _this = this;
                    this.provider.fetchRecord(setting, event, function (record, setting, event) { return _this.success_(record, setting, event); }, function (record, setting, event) { return _this.failure_(record, setting, event); });
                };
                Page.prototype.success_ = function (record, setting, event) {
                    new APP.PageUpdate(this.model_, this, this.data_, this.balancer_, setting, event, record);
                };
                Page.prototype.failure_ = function (record, setting, event) {
                    var _this = this;
                    if (!setting.fallback || 'abort' === record.data.textStatus()) {
                        return;
                    }
                    this.data_.saveExpires(setting.destLocation.href, '', 0);
                    if (setting.balance.active) {
                        this.data_.saveServer(record.data.host(), new Date().getTime() + setting.balance.server.expires, 0, 0, new Date().getTime());
                        this.balancer_.changeServer(this.balancer_.chooseServer(setting), setting);
                    }
                    setTimeout(function () { return _this.model_.fallback(event); }, 100);
                };
                Page.prototype.chooseArea = function (areas, srcDocument, dstDocument) {
                    return;
                };
                Page.prototype.dispatchEvent = function (target, eventType, bubbling, cancelable) {
                };
                return Page;
            })();
            APP.Page = Page;
        })(APP = MODEL.APP || (MODEL.APP = {}));
    })(MODEL = MODULE.MODEL || (MODULE.MODEL = {}));
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="_template.ts"/>
/// <reference path="app.balancer.ts"/>
/// <reference path="app.page.ts"/>
/// <reference path="app.data.ts"/>
/// <reference path="../view/main.ts"/>
/// <reference path="../library/utility.ts"/>
/* MODEL */
var MODULE;
(function (MODULE) {
    var MODEL;
    (function (MODEL) {
        var APP;
        (function (APP) {
            MODULE.MIXIN(APP.Page, [APP.PageUtility]);
            var Main = (function () {
                function Main(model_, controller_) {
                    this.model_ = model_;
                    this.controller_ = controller_;
                    this.util_ = MODULE.LIBRARY.Utility;
                    this.settings_ = {};
                    this.data = new APP.Data(this.model_);
                    this.balancer = new APP.Balancer(this.data);
                    this.page = new APP.Page(this.model_, this.data, this.balancer);
                }
                Main.prototype.initialize = function ($context, setting) {
                    var _this = this;
                    this.controller_.view($context, setting);
                    this.balancer.enable(setting);
                    this.data.loadBuffers();
                    setTimeout(function () { return _this.page.landing = null; }, 1500);
                };
                Main.prototype.configure = function (destination) {
                    var _this = this;
                    var event = destination.preventDefault ? destination : null;
                    switch (event && 'object' === typeof event && event.type.toLowerCase()) {
                        case MODULE.EVENT.CLICK:
                            return this.configure(event.currentTarget);
                        case MODULE.EVENT.SUBMIT:
                            return this.configure(event.currentTarget);
                        case MODULE.EVENT.POPSTATE:
                            return this.configure(window.location);
                        case null:
                            break;
                    }
                    var url;
                    switch (true) {
                        case 'string' === typeof destination:
                            url = destination;
                            break;
                        case 'href' in destination:
                            url = this.util_.normalizeUrl(destination.href);
                            break;
                        case 'action' in destination:
                            url = this.util_.normalizeUrl(destination.action.replace(/[?#].*/, ''));
                            switch (destination.method.toUpperCase()) {
                                case 'GET':
                                    url += '?' + jQuery(destination).serialize();
                                    break;
                            }
                            break;
                        default:
                            url = this.model_.location.href;
                            this.option_ = destination;
                    }
                    var index = [
                        this.util_.canonicalizeUrl(this.model_.location.href).slice(0, 2048),
                        this.util_.canonicalizeUrl(url).slice(0, 2048)
                    ].join(' ');
                    if (!this.option_) {
                        return null;
                    }
                    if (index in this.settings_) {
                        return this.settings_[index];
                    }
                    var origLocation = this.model_.location.cloneNode(), destLocation = this.model_.location.cloneNode();
                    origLocation.href = this.util_.canonicalizeUrl(origLocation.href);
                    destLocation.href = this.util_.canonicalizeUrl(url);
                    var scope = this.scope_(this.option_, origLocation.href, destLocation.href) || null;
                    var initial = {
                        area: 'body',
                        link: 'a:not([target])',
                        // this.protocolはIEでエラー
                        filter: function () {
                            return /^https?:/.test(this.href) && /\/[^.]*$|\.(html?|php)$/.test(this.pathname.replace(/^\/?/, '/'));
                        },
                        form: null,
                        scope: null,
                        rewrite: null,
                        state: null,
                        scrollTop: 0,
                        scrollLeft: 0,
                        ajax: { dataType: 'text' },
                        contentType: 'text/html',
                        redirect: true,
                        cache: {
                            click: false,
                            submit: false,
                            popstate: false,
                            get: true,
                            post: true,
                            mix: 0,
                            limit: 100 /* pages */,
                            expires: { max: null, min: 5 * 60 * 1000 /* 5min */ }
                        },
                        buffer: {
                            limit: 30,
                            delay: 500
                        },
                        load: {
                            head: '',
                            css: false,
                            script: false,
                            ignore: '[src*="jquery.js"], [src*="jquery.min.js"], [href^="chrome-extension://"]',
                            reload: '',
                            log: 'head, body',
                            error: true,
                            ajax: { dataType: 'script', cache: true }
                        },
                        balance: {
                            active: false,
                            bounds: /^.*$/,
                            weight: 1,
                            random: 0,
                            option: {
                                server: {
                                    header: false
                                },
                                ajax: {
                                    crossDomain: true
                                },
                                callbacks: {
                                    ajax: {
                                        beforeSend: null
                                    }
                                }
                            },
                            client: {
                                hosts: [],
                                support: {
                                    browser: /msie|trident.+ rv:|chrome|firefox|safari/i,
                                    redirect: /chrome|firefox|safari/i
                                },
                                cookie: {
                                    balance: 'balanceable',
                                    redirect: 'redirectable',
                                    host: 'host'
                                }
                            },
                            server: {
                                header: 'X-Ajax-Host',
                                respite: 10 * 60 * 1000,
                                expires: 10 * 24 * 60 * 60 * 1000
                            }
                        },
                        wait: 0,
                        fallback: true,
                        reset: {
                            type: '',
                            count: 100,
                            time: 3 * 60 * 60 * 1000
                        },
                        fix: {
                            location: true,
                            history: true,
                            scroll: true,
                            noscript: true,
                            reference: true
                        },
                        database: {
                            active: true,
                            revision: 0,
                            refresh: 10
                        },
                        server: {
                            query: null,
                            header: true
                        },
                        overlay: '',
                        callback: null,
                        callbacks: {
                            ajax: {},
                            update: { redirect: {}, url: {}, rewrite: {}, title: {}, head: {}, content: {}, scroll: {}, css: {}, script: {}, balance: {} }
                        },
                        data: undefined
                    }, force = {
                        uid: MODULE.UUID(),
                        ns: '',
                        nss: undefined,
                        speedcheck: undefined,
                        origLocation: origLocation,
                        destLocation: destLocation,
                        scroll: { queue: [] },
                        option: this.option_
                    }, compute = function () {
                        setting.ns = setting.ns ? setting.ns.split('.').sort().join('.') : '';
                        var nsArray = [MODULE.DEF.NAME].concat(setting.ns ? setting.ns.split('.') : []);
                        var query = setting.server.query;
                        switch (query && typeof query) {
                            case 'string':
                                query = eval('({' + query.match(/[^?=&]+=[^&]*/g).join('&').replace(/"/g, '\\"').replace(/([^?=&]+)=([^&]*)/g, '"$1": "$2"').replace(/&/g, ',') + '})');
                            case 'object':
                                query = jQuery.param(query);
                                break;
                            default:
                                query = '';
                        }
                        return {
                            uid: undefined,
                            ns: undefined,
                            origLocation: undefined,
                            destLocation: undefined,
                            scroll: undefined,
                            option: undefined,
                            speedcheck: undefined,
                            nss: {
                                array: nsArray,
                                name: nsArray.join('.'),
                                data: nsArray[0],
                                url: _this.model_.convertUrlToKey(setting.destLocation.href, true),
                                event: {
                                    pjax: {
                                        fetch: [MODULE.EVENT.PJAX, 'fetch'].join(':'),
                                        unload: [MODULE.EVENT.PJAX, 'unload'].join(':'),
                                        DOMContentLoaded: [MODULE.EVENT.PJAX, 'DOMContentLoaded'].join(':'),
                                        ready: [MODULE.EVENT.PJAX, 'ready'].join(':'),
                                        render: [MODULE.EVENT.PJAX, 'render'].join(':'),
                                        load: [MODULE.EVENT.PJAX, 'load'].join(':')
                                    },
                                    click: [MODULE.EVENT.CLICK].concat(nsArray.join(':')).join('.'),
                                    submit: [MODULE.EVENT.SUBMIT].concat(nsArray.join(':')).join('.'),
                                    popstate: [MODULE.EVENT.POPSTATE].concat(nsArray.join(':')).join('.'),
                                    scroll: [MODULE.EVENT.SCROLL].concat(nsArray.join(':')).join('.')
                                },
                                elem: nsArray.join('-'),
                                requestHeader: ['X', nsArray[0].replace(/^\w/, function (str) {
                                    return str.toUpperCase();
                                })].join('-')
                            },
                            fix: /android|iphone os|like mac os x/i.test(window.navigator.userAgent) ? undefined : { location: false },
                            contentType: setting.contentType.replace(/\s*[,;]\s*/g, '|').toLowerCase(),
                            database: {
                                refresh: Math.min(setting.database.refresh, 30)
                            },
                            reset: {
                                type: (setting.reset.type || '').toLowerCase()
                            },
                            server: {
                                query: query
                            },
                            timeStamp: new Date().getTime()
                        };
                    };
                    var setting;
                    setting = jQuery.extend(true, initial, scope || this.option_);
                    setting = jQuery.extend(true, setting, setting.balance.active && setting.balance.option, force);
                    setting = jQuery.extend(true, setting, compute());
                    if (scope) {
                        MODULE.FREEZE(setting, true);
                        this.settings_[index] = setting;
                        return setting;
                    }
                    else {
                        this.settings_[index] = null;
                        return null;
                    }
                };
                Main.prototype.scope_ = function (option, origURL, destURL, rewriteKeyUrl) {
                    if (rewriteKeyUrl === void 0) { rewriteKeyUrl = ''; }
                    option = jQuery.extend(true, {}, option);
                    if (!option.scope) {
                        return option;
                    }
                    var origKeyUrl, destKeyUrl, scpTable = option.scope, dirs, scpKeys, scpKey, scpTag, scope;
                    origKeyUrl = this.model_.convertUrlToKey(origURL, true).match(/.+?\w(\/.*)/).pop();
                    destKeyUrl = this.model_.convertUrlToKey(destURL, true).match(/.+?\w(\/.*)/).pop();
                    rewriteKeyUrl = rewriteKeyUrl.replace(/[#?].*/, '');
                    scpKeys = (rewriteKeyUrl || origKeyUrl).split('/');
                    if (rewriteKeyUrl) {
                        if (!~rewriteKeyUrl.indexOf('*')) {
                            return undefined;
                        }
                        dirs = [];
                        var arr = origKeyUrl.split('/');
                        for (var i = 0, len = scpKeys.length; i < len; i++) {
                            '*' === scpKeys[i] && dirs.push(arr[i]);
                        }
                    }
                    for (var i = scpKeys.length; i--;) {
                        scpKey = scpKeys.slice(0, i + 1).join('/');
                        scpKey = scpKey + ('/' === (rewriteKeyUrl || origKeyUrl).charAt(scpKey.length) ? '/' : '');
                        if (!scpKey || !(scpKey in scpTable)) {
                            continue;
                        }
                        var patterns;
                        if (scpTable[scpKey] instanceof Array) {
                            scpTag = '';
                            patterns = scpTable[scpKey];
                        }
                        else {
                            scpTag = scpTable[scpKey];
                            patterns = scpTable[scpTag];
                        }
                        if (patterns) {
                            patterns = patterns.concat();
                        }
                        else {
                            continue;
                        }
                        var hit_src, hit_dst, inherit, expanded = [];
                        inherit = scope = hit_src = hit_dst = undefined;
                        for (var j = 0, pattern; pattern = patterns[j]; j++) {
                            if ('#' === pattern.charAt(0)) {
                                if (!~jQuery.inArray(pattern, expanded) && pattern.length > 1) {
                                    expanded.push(pattern);
                                    scpTag = pattern.slice(1);
                                    [].splice.apply(patterns, [j, 1].concat(scpTable[scpTag], '#'));
                                    pattern = patterns[j];
                                }
                                else {
                                    scpTag = '';
                                    continue;
                                }
                            }
                            if ('inherit' === pattern) {
                                inherit = true;
                            }
                            else if ('rewrite' === pattern && 'function' === typeof scpTable.rewrite && !rewriteKeyUrl) {
                                scope = this.scope_(option, origURL, destURL, this.util_.fire(scpTable.rewrite, null, [destKeyUrl]));
                                if (scope) {
                                    hit_src = hit_dst = true;
                                }
                                else if (null === scope) {
                                    hit_src = hit_dst = false;
                                }
                            }
                            else if ('string' === typeof pattern) {
                                var not = '!' === pattern.charAt(0);
                                pattern = not ? pattern.slice(1) : pattern;
                                var reg = '*' === pattern.charAt(0);
                                pattern = reg ? pattern.slice(1) : pattern;
                                if (rewriteKeyUrl && ~pattern.indexOf('/*/')) {
                                    for (var k = 0, len = dirs.length; k < len; k++) {
                                        pattern = pattern.replace('/*/', '/' + dirs[k] + '/');
                                    }
                                }
                                if (reg ? ~origKeyUrl.search(pattern) : ~origKeyUrl.indexOf(pattern)) {
                                    if (not) {
                                        hit_src = false;
                                    }
                                    else {
                                        hit_src = true;
                                        scope = scpTable['$' + scpTag] || scpTable['$' + pattern] || undefined;
                                    }
                                }
                                if (reg ? ~destKeyUrl.search(pattern) : ~destKeyUrl.indexOf(pattern)) {
                                    if (not) {
                                        hit_dst = false;
                                    }
                                    else {
                                        hit_dst = true;
                                        scope = scpTable['$' + scpTag] || scpTable['$' + pattern] || undefined;
                                    }
                                }
                            }
                            if (false === hit_src || false === hit_dst) {
                                return null;
                            }
                        }
                        if (hit_src && hit_dst) {
                            return jQuery.extend(true, option, scope);
                        }
                        else if (inherit) {
                            continue;
                        }
                        break;
                    }
                    return undefined;
                };
                return Main;
            })();
            APP.Main = Main;
        })(APP = MODEL.APP || (MODEL.APP = {}));
    })(MODEL = MODULE.MODEL || (MODULE.MODEL = {}));
})(MODULE || (MODULE = {}));
var MODULE;
(function (MODULE) {
    var MODEL;
    (function (MODEL) {
        MODEL.App = MODEL.APP.Main;
    })(MODEL = MODULE.MODEL || (MODULE.MODEL = {}));
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="_template.ts"/>
/// <reference path="app.ts"/>
/// <reference path="data.ts"/>
/// <reference path="../library/utility.ts"/>
/// <reference path="../view/main.ts"/>
/// <reference path="../controller/main.ts"/>
/* MODEL */
var MODULE;
(function (MODULE) {
    var MODEL;
    (function (MODEL) {
        var Main = (function (_super) {
            __extends(Main, _super);
            function Main() {
                _super.call(this, 1 /* initiate */);
                this.controller_ = new MODULE.Controller(this).singleton();
                this.app_ = new MODEL.App(this, this.controller_);
                this.util_ = MODULE.LIBRARY.Utility;
                this.isDeferrable = !!jQuery.when && '1.006' <= jQuery().jquery.match(/\d[\d.]+\d/).pop().replace(/\.(\d+)/g, '.00$1').replace(/0*(\d{3})/g, '$1');
                this.location = document.createElement('a');
                this.queue_ = [];
            }
            Main.prototype.host = function () {
                return this.app_.balancer.host();
            };
            Main.prototype.state = function () {
                return this.state_;
            };
            Main.prototype.main_ = function ($context, option) {
                var _this = this;
                switch (typeof option) {
                    case 'object':
                        $context = $context instanceof MODULE.DEF.NAMESPACE ? $context : jQuery(document)[MODULE.DEF.NAME]();
                        MODULE.FREEZE(option, true);
                        break;
                    default:
                        return $context;
                }
                if (!window.history || !window.history['pushState'] || !window.history['replaceState']) {
                    return $context;
                }
                this.location.href = this.util_.normalizeUrl(window.location.href);
                var setting = this.app_.configure(option);
                if (!setting) {
                    return $context;
                }
                this.app_.data.connect(setting);
                this.speed = {
                    fire: 0,
                    time: [],
                    name: [],
                    now: function () {
                        return new Date().getTime();
                    }
                };
                jQuery(function () {
                    _this.app_.initialize($context, setting);
                    _this.state_ = _this.state() === 1 /* initiate */ ? 2 /* open */ : _this.state();
                    _this.overlay(setting, true);
                });
                return $context;
            };
            Main.prototype.convertUrlToKey = function (unsafe_url, canonicalize) {
                unsafe_url = canonicalize ? this.util_.canonicalizeUrl(unsafe_url) : unsafe_url;
                return this.util_.trim(unsafe_url).split('#').shift();
            };
            Main.prototype.compareKeyByUrl = function (a, b) {
                a = this.convertUrlToKey(a, true);
                b = this.convertUrlToKey(b, true);
                return a === b;
            };
            Main.prototype.comparePageByUrl = function (a, b) {
                a = this.convertUrlToKey(a, true);
                b = this.convertUrlToKey(b, true);
                return a === b;
            };
            Main.prototype.configure = function (destination) {
                return this.app_.configure(destination);
            };
            Main.prototype.isOperatable = function (event) {
                if (2 /* open */ !== this.state()) {
                    return false;
                }
                if (event.which > 1 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
                    return false;
                }
                var setting;
                switch (event.type.toLowerCase()) {
                    case MODULE.EVENT.CLICK:
                        setting = this.app_.configure(event.currentTarget);
                        if (setting && !jQuery(event.currentTarget).filter(setting.filter).length) {
                            return false;
                        }
                        break;
                    case MODULE.EVENT.SUBMIT:
                        setting = this.app_.configure(event.currentTarget);
                        break;
                    case MODULE.EVENT.POPSTATE:
                        setting = this.app_.configure(window.location);
                        break;
                }
                if (!setting) {
                    return false;
                }
                if (setting.origLocation.protocol !== setting.destLocation.protocol || setting.origLocation.host !== setting.destLocation.host) {
                    return false;
                }
                switch (event.type.toLowerCase()) {
                    case MODULE.EVENT.CLICK:
                        if (this.comparePageByUrl(setting.origLocation.href, setting.destLocation.href) && setting.destLocation.hash) {
                            return false;
                        }
                        break;
                    case MODULE.EVENT.SUBMIT:
                        break;
                    case MODULE.EVENT.POPSTATE:
                        if (this.comparePageByUrl(setting.origLocation.href, setting.destLocation.href)) {
                            return false;
                        }
                        break;
                }
                if (!this.app_.page.chooseArea(setting.area, document, document)) {
                    return false;
                }
                return true;
            };
            Main.prototype.getXHR = function () {
                return this.app_.page.xhr;
            };
            Main.prototype.setXHR = function ($xhr) {
                this.app_.balancer.sanitize($xhr, this.app_.configure(window.location));
                this.app_.page.xhr && this.app_.page.xhr.readyState < 4 && this.app_.page.xhr !== $xhr && this.app_.page.xhr.abort();
                return this.app_.page.xhr = $xhr;
            };
            Main.prototype.click = function (event) {
                event.timeStamp = new Date().getTime();
                var context = event.currentTarget, $context = jQuery(context);
                var setting = this.app_.configure(context);
                this.location.href = this.util_.normalizeUrl(window.location.href);
                switch (true) {
                    case !setting:
                    case event.isDefaultPrevented():
                    case this.state() !== 2 /* open */:
                        break;
                    case this.isOperatable(event):
                        this.app_.page.transfer(setting, event);
                        event.preventDefault();
                        break;
                    case this.isHashChange(setting) && this.overlay(setting):
                        event.preventDefault();
                        window.history.pushState(null, document.title, setting.destLocation.href);
                        break;
                    case !event.originalEvent && !jQuery(document).has(context).length:
                        // clickメソッド用
                        this.fallback(event);
                        break;
                }
            };
            Main.prototype.submit = function (event) {
                event.timeStamp = new Date().getTime();
                var context = event.currentTarget, $context = jQuery(context);
                var setting = this.app_.configure(context);
                this.location.href = this.util_.normalizeUrl(window.location.href);
                switch (true) {
                    case !setting:
                    case event.isDefaultPrevented():
                    case this.state() !== 2 /* open */:
                        break;
                    case this.isOperatable(event):
                        this.app_.page.transfer(setting, event);
                        event.preventDefault;
                        break;
                    case !event.originalEvent && !jQuery(document).has(context).length:
                        // submitメソッド用
                        this.fallback(event);
                        break;
                }
            };
            Main.prototype.popstate = function (event) {
                if (this.app_.page.landing && this.util_.compareUrl(this.app_.page.landing, window.location.href)) {
                    return;
                }
                event.timeStamp = new Date().getTime();
                var setting = this.app_.configure(window.location);
                switch (true) {
                    case !setting:
                        !this.comparePageByUrl(this.location.href, window.location.href) && this.fallback(event);
                        break;
                    case this.state() !== 2 /* open */:
                        break;
                    case this.isOperatable(event):
                        this.app_.page.transfer(setting, event);
                        break;
                    case this.isHashChange(setting) && this.overlay(setting):
                        break;
                    case !this.comparePageByUrl(setting.origLocation.href, window.location.href):
                        // pjax処理されないURL変更によるページ更新
                        this.fallback(event);
                        break;
                }
                this.location.href = this.util_.normalizeUrl(window.location.href);
            };
            Main.prototype.scroll = function (event, end) {
                var _this = this;
                var id;
                while (id = this.queue_.shift()) {
                    clearTimeout(id);
                }
                id = setTimeout(function () {
                    while (id = _this.queue_.shift()) {
                        clearTimeout(id);
                    }
                    _this.compareKeyByUrl(window.location.href, _this.location.href) && _this.app_.data.saveScrollPosition();
                }, 300);
                this.queue_.push(id);
            };
            Main.prototype.fallback = function (event) {
                var setting = this.configure(event);
                switch (true) {
                    case setting && !setting.fallback:
                    case setting && false === this.util_.fire(setting.fallback, setting, [event, setting, setting.origLocation.cloneNode(), setting.destLocation.cloneNode()]):
                        break;
                    default:
                        this.movePageNormally_(event);
                }
            };
            Main.prototype.movePageNormally_ = function (event) {
                switch (event.type.toLowerCase()) {
                    case MODULE.EVENT.CLICK:
                        window.location.assign(event.currentTarget.href);
                        break;
                    case MODULE.EVENT.SUBMIT:
                        switch (event.currentTarget.method.toUpperCase()) {
                            case 'GET':
                                window.location.assign(event.currentTarget.action.replace(/[?#].*/, '') + '?' + jQuery(event.currentTarget).serialize());
                                break;
                            case 'POST':
                                window.location.assign(event.currentTarget.action);
                                break;
                        }
                        break;
                    case MODULE.EVENT.POPSTATE:
                        window.location.reload();
                        break;
                }
            };
            Main.prototype.isHashChange = function (setting) {
                return !!setting && setting.origLocation.href.replace(/#.*/, '') === setting.destLocation.href.replace(/#.*/, '') && setting.origLocation.hash !== setting.destLocation.hash;
            };
            Main.prototype.overlay = function (setting, immediate) {
                var _this = this;
                var hash = setting.destLocation.hash.replace(/^#/, '');
                if (!hash || !setting.overlay) {
                    return false;
                }
                var $hashTargetElement = jQuery('#' + hash + ', [name~=' + hash + ']');
                $hashTargetElement = $hashTargetElement.add($hashTargetElement.nextUntil(':header'));
                $hashTargetElement = $hashTargetElement.filter(setting.overlay).add($hashTargetElement.find(setting.overlay)).first();
                if (!$hashTargetElement.length) {
                    return false;
                }
                if (this.isHashChange(setting)) {
                    this.app_.data.loadScrollPosition();
                    setTimeout(function () { return _this.app_.data.loadScrollPosition(); }, 1);
                }
                var $container = jQuery('<div>');
                $hashTargetElement = $hashTargetElement.clone(true);
                $container.addClass(setting.nss.elem + '-overlay').css({
                    background: 'rgba(255, 255, 255, 0.8)',
                    display: 'none',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    margin: 0,
                    padding: 0,
                    border: 'none'
                }).append($hashTargetElement.css({
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    margin: 'auto'
                }).show());
                $container.bind('click', $container, function (event) {
                    if (event.target !== event.currentTarget) {
                        return;
                    }
                    window.history.pushState(window.history.state, document.title, window.location.href.replace(/#.*/, ''));
                    _this.location.href = _this.util_.normalizeUrl(window.location.href);
                    jQuery(event.data).fadeOut('fast', function () { return jQuery(event.data).remove(); });
                });
                $container.appendTo('body').fadeIn(immediate ? 0 : 100);
                jQuery(window).one('popstate', $container, function (event) {
                    setTimeout(function () { return _this.app_.data.loadScrollPosition(); }, 1);
                    jQuery(event.data).fadeOut('fast', function () { return jQuery(event.data).remove(); });
                });
                /trident/i.test(window.navigator.userAgent) && $hashTargetElement.width($hashTargetElement.width());
                this.app_.data.saveScrollPosition();
                return true;
            };
            Main.prototype.enable = function () {
                this.state_ = 2 /* open */;
            };
            Main.prototype.disable = function () {
                this.state_ = 3 /* pause */;
            };
            Main.prototype.getCache = function (unsafe_url) {
                var setting = this.configure(this.convertUrlToKey(unsafe_url));
                if (!setting) {
                    return;
                }
                var record = this.app_.page.provider.getRecord(setting);
                return record.state(setting) || record.data.data() ? {
                    data: record.data.data(),
                    textStatus: record.data.textStatus(),
                    jqXHR: record.data.jqXHR(),
                    expires: record.data.expires(),
                    host: record.data.host()
                } : void this.removeCache(unsafe_url);
            };
            Main.prototype.setCache = function (unsafe_url, data, textStatus, jqXHR) {
                var setting = this.configure(this.convertUrlToKey(unsafe_url));
                if (!setting) {
                    return;
                }
                var record = this.app_.page.provider.getRecord(setting);
                this.app_.page.provider.setRecord(setting, data || '', textStatus || record.data.textStatus(), jqXHR || record.data.jqXHR(), this.app_.balancer.sanitize(jqXHR, setting) || record.data.host() || '');
            };
            Main.prototype.removeCache = function (unsafe_url) {
                var setting = this.configure(this.convertUrlToKey(unsafe_url));
                if (!setting) {
                    return;
                }
                this.app_.page.provider.removeRecord(setting);
            };
            Main.prototype.clearCache = function () {
                this.app_.page.provider.clearRecord();
            };
            Main.prototype.bypass = function () {
                return this.app_.balancer.bypass(this.app_.configure(window.location));
            };
            return Main;
        })(MODEL.Template);
        MODEL.Main = Main;
        var Singleton = (function () {
            function Singleton() {
                Singleton.instance_ = Singleton.instance_ || new Main();
            }
            Singleton.singleton = function () {
                return Singleton.instance_;
            };
            Singleton.prototype.singleton = function () {
                return Singleton.singleton();
            };
            return Singleton;
        })();
        MODEL.Singleton = Singleton;
    })(MODEL = MODULE.MODEL || (MODULE.MODEL = {}));
})(MODULE || (MODULE = {}));
var MODULE;
(function (MODULE) {
    MODULE.Model = MODULE.MODEL.Singleton;
})(MODULE || (MODULE = {}));
/// <reference path="model/main.ts"/>
/// <reference path="view/main.ts"/>
/// <reference path="controller/main.ts"/>
var Module = (function () {
    function Module() {
        new MODULE.Model();
    }
    return Module;
})();
new Module();
}(window, window.document, void 0, jQuery);

; browserify_shim__define__module__export__(typeof pjax != "undefined" ? pjax : window.pjax);

}).call(global, undefined, undefined, undefined, undefined, function defineExport(ex) { module.exports = ex; });

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],2:[function(require,module,exports){
(function (global){
;__browserify_shim_require__=require;(function browserifyShim(module, exports, require, define, browserify_shim__define__module__export__) {
/*!
 * jQuery JavaScript Library v2.1.3
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-12-18T15:11Z
 */

(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//

var arr = [];

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	version = "2.1.3",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray,

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		return !jQuery.isArray( obj ) && (obj - parseFloat( obj ) + 1) >= 0;
	},

	isPlainObject: function( obj ) {
		// Not plain objects:
		// - Any object or value whose internal [[Class]] property is not "[object Object]"
		// - DOM nodes
		// - window
		if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		if ( obj.constructor &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
			return false;
		}

		// If the function hasn't returned already, we're confident that
		// |obj| is a plain object, created by {} or constructed with new Object
		return true;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		// Support: Android<4.0, iOS<6 (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		var script,
			indirect = eval;

		code = jQuery.trim( code );

		if ( code ) {
			// If the code includes a valid, prologue position
			// strict mode pragma, execute code by injecting a
			// script tag into the document.
			if ( code.indexOf("use strict") === 1 ) {
				script = document.createElement("script");
				script.text = code;
				document.head.appendChild( script ).parentNode.removeChild( script );
			} else {
			// Otherwise, avoid the DOM node creation, insertion
			// and removal by using an indirect global eval
				indirect( code );
			}
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Support: IE9-11+
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
	var length = obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.0-pre
 * http://sizzlejs.com/
 *
 * Copyright 2008, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-12-16
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + characterEncoding + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];
	nodeType = context.nodeType;

	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	if ( !seed && documentIsHTML ) {

		// Try to shortcut find operations when possible (e.g., not under DocumentFragment)
		if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType !== 1 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;
	parent = doc.defaultView;

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Support tests
	---------------------------------------------------------------------- */
	documentIsHTML = !isXML( doc );

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\f]' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.2+, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.7+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is no seed and only one group
	if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( indexOf.call( qualifier, elem ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			len = this.length,
			ret = [],
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[0] === "<" && selector[ selector.length - 1 ] === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Support: Blackberry 4.6
					// gEBID returns nodes no longer in the document (#6963)
					if ( elem && elem.parentNode ) {
						// Inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			truncate = until !== undefined;

		while ( (elem = elem[ dir ]) && elem.nodeType !== 9 ) {
			if ( elem.nodeType === 1 ) {
				if ( truncate && jQuery( elem ).is( until ) ) {
					break;
				}
				matched.push( elem );
			}
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var matched = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				matched.push( n );
			}
		}

		return matched;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter(function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	while ( (cur = cur[dir]) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return elem.contentDocument || jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.unique( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// Flag to know if list is currently firing
		firing,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );
					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// Add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// If we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
});

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed, false );
	window.removeEventListener( "load", completed, false );
	jQuery.ready();
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// We once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		} else {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			len ? fn( elems[0], key ) : emptyGet;
};


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( owner ) {
	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	/* jshint -W018 */
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};


function Data() {
	// Support: Android<4,
	// Old WebKit does not have Object.preventExtensions/freeze method,
	// return new empty object instead with no [[set]] accessor
	Object.defineProperty( this.cache = {}, 0, {
		get: function() {
			return {};
		}
	});

	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;
Data.accepts = jQuery.acceptData;

Data.prototype = {
	key: function( owner ) {
		// We can accept data for non-element nodes in modern browsers,
		// but we should not, see #8335.
		// Always return the key for a frozen object.
		if ( !Data.accepts( owner ) ) {
			return 0;
		}

		var descriptor = {},
			// Check if the owner object already has a cache key
			unlock = owner[ this.expando ];

		// If not, create one
		if ( !unlock ) {
			unlock = Data.uid++;

			// Secure it in a non-enumerable, non-writable property
			try {
				descriptor[ this.expando ] = { value: unlock };
				Object.defineProperties( owner, descriptor );

			// Support: Android<4
			// Fallback to a less secure definition
			} catch ( e ) {
				descriptor[ this.expando ] = unlock;
				jQuery.extend( owner, descriptor );
			}
		}

		// Ensure the cache object
		if ( !this.cache[ unlock ] ) {
			this.cache[ unlock ] = {};
		}

		return unlock;
	},
	set: function( owner, data, value ) {
		var prop,
			// There may be an unlock assigned to this node,
			// if there is no entry for this "owner", create one inline
			// and set the unlock as though an owner entry had always existed
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		// Handle: [ owner, key, value ] args
		if ( typeof data === "string" ) {
			cache[ data ] = value;

		// Handle: [ owner, { properties } ] args
		} else {
			// Fresh assignments by object are shallow copied
			if ( jQuery.isEmptyObject( cache ) ) {
				jQuery.extend( this.cache[ unlock ], data );
			// Otherwise, copy the properties one-by-one to the cache object
			} else {
				for ( prop in data ) {
					cache[ prop ] = data[ prop ];
				}
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		// Either a valid cache is found, or will be created.
		// New caches will be created and the unlock returned,
		// allowing direct access to the newly created
		// empty data object. A valid owner object must be provided.
		var cache = this.cache[ this.key( owner ) ];

		return key === undefined ?
			cache : cache[ key ];
	},
	access: function( owner, key, value ) {
		var stored;
		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				((key && typeof key === "string") && value === undefined) ) {

			stored = this.get( owner, key );

			return stored !== undefined ?
				stored : this.get( owner, jQuery.camelCase(key) );
		}

		// [*]When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i, name, camel,
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		if ( key === undefined ) {
			this.cache[ unlock ] = {};

		} else {
			// Support array or space separated string of keys
			if ( jQuery.isArray( key ) ) {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = key.concat( key.map( jQuery.camelCase ) );
			} else {
				camel = jQuery.camelCase( key );
				// Try the string as a key before any manipulation
				if ( key in cache ) {
					name = [ key, camel ];
				} else {
					// If a key with the spaces exists, use it.
					// Otherwise, create an array by matching non-whitespace
					name = camel;
					name = name in cache ?
						[ name ] : ( name.match( rnotwhite ) || [] );
				}
			}

			i = name.length;
			while ( i-- ) {
				delete cache[ name[ i ] ];
			}
		}
	},
	hasData: function( owner ) {
		return !jQuery.isEmptyObject(
			this.cache[ owner[ this.expando ] ] || {}
		);
	},
	discard: function( owner ) {
		if ( owner[ this.expando ] ) {
			delete this.cache[ owner[ this.expando ] ];
		}
	}
};
var data_priv = new Data();

var data_user = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			data_user.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend({
	hasData: function( elem ) {
		return data_user.hasData( elem ) || data_priv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return data_user.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		data_user.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to data_priv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return data_priv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		data_priv.remove( elem, name );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = data_user.get( elem );

				if ( elem.nodeType === 1 && !data_priv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice(5) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					data_priv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				data_user.set( this, key );
			});
		}

		return access( this, function( value ) {
			var data,
				camelKey = jQuery.camelCase( key );

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {
				// Attempt to get data from the cache
				// with the key as-is
				data = data_user.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to get data from the cache
				// with the key camelized
				data = data_user.get( elem, camelKey );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, camelKey, undefined );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each(function() {
				// First, attempt to store a copy or reference of any
				// data that might've been store with a camelCased key.
				var data = data_user.get( this, camelKey );

				// For HTML5 data-* attribute interop, we have to
				// store property names with dashes in a camelCase form.
				// This might not apply to all properties...*
				data_user.set( this, camelKey, value );

				// *... In the case of properties that might _actually_
				// have dashes, we need to also store a copy of that
				// unchanged property.
				if ( key.indexOf("-") !== -1 && data !== undefined ) {
					data_user.set( this, key, value );
				}
			});
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each(function() {
			data_user.remove( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = data_priv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = data_priv.access( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return data_priv.get( elem, key ) || data_priv.access( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				data_priv.remove( elem, [ type + "queue", key ] );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = data_priv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};

var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Safari<=5.1
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari<=5.1, Android<4.2
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<=11+
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
})();
var strundefined = typeof undefined;



support.focusinBubbles = "onfocusin" in window;


var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.hasData( elem ) && data_priv.get( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;
			data_priv.remove( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( data_priv.get( cur, "events" ) || {} )[ event.type ] && data_priv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( data_priv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.disabled !== true || event.type !== "click" ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var eventDoc, doc, body,
				button = original.button;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: Cordova 2.5 (WebKit) (#13255)
		// All events should have a target; Cordova deviceready doesn't
		if ( !event.target ) {
			event.target = document;
		}

		// Support: Safari 6.0+, Chrome<28
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle, false );
	}
};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				// Support: Android<4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && e.preventDefault ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && e.stopPropagation ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// Support: Chrome 15+
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// Support: Firefox, Chrome, Safari
// Create "bubbling" focus and blur events
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = data_priv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				data_priv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = data_priv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					data_priv.remove( doc, fix );

				} else {
					data_priv.access( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var origFn, type;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


var
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {

		// Support: IE9
		option: [ 1, "<select multiple='multiple'>", "</select>" ],

		thead: [ 1, "<table>", "</table>" ],
		col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		_default: [ 0, "", "" ]
	};

// Support: IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

// Support: 1.x compatibility
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute("type");
	}

	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		data_priv.set(
			elems[ i ], "globalEval", !refElements || data_priv.get( refElements[ i ], "globalEval" )
		);
	}
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( data_priv.hasData( src ) ) {
		pdataOld = data_priv.access( src );
		pdataCur = data_priv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( data_user.hasData( src ) ) {
		udataOld = data_user.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		data_user.set( dest, udataCur );
	}
}

function getAll( context, tag ) {
	var ret = context.getElementsByTagName ? context.getElementsByTagName( tag || "*" ) :
			context.querySelectorAll ? context.querySelectorAll( tag || "*" ) :
			[];

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], ret ) :
		ret;
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var elem, tmp, tag, wrap, contains, j,
			fragment = context.createDocumentFragment(),
			nodes = [],
			i = 0,
			l = elems.length;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					// Support: QtWebKit, PhantomJS
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || fragment.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;
					tmp.innerHTML = wrap[ 1 ] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[ 2 ];

					// Descend through wrappers to the right content
					j = wrap[ 0 ];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Support: QtWebKit, PhantomJS
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, tmp.childNodes );

					// Remember the top-level container
					tmp = fragment.firstChild;

					// Ensure the created nodes are orphaned (#12392)
					tmp.textContent = "";
				}
			}
		}

		// Remove wrapper from fragment
		fragment.textContent = "";

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( fragment.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		return fragment;
	},

	cleanData: function( elems ) {
		var data, elem, type, key,
			special = jQuery.event.special,
			i = 0;

		for ( ; (elem = elems[ i ]) !== undefined; i++ ) {
			if ( jQuery.acceptData( elem ) ) {
				key = elem[ data_priv.expando ];

				if ( key && (data = data_priv.cache[ key ]) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}
					if ( data_priv.cache[ key ] ) {
						// Discard any remaining `private` data
						delete data_priv.cache[ key ];
					}
				}
			}
			// Discard any remaining `user` data
			delete data_user.cache[ elem[ data_user.expando ] ];
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each(function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				});
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var fragment, first, scripts, hasScripts, node, doc,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[ 0 ],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[ 0 ] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							// Support: QtWebKit
							// jQuery.merge because push.apply(_, arraylike) throws
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[ i ], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!data_priv.access( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( node.textContent.replace( rcleanScript, "" ) );
							}
						}
					}
				}
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: QtWebKit
			// .get() because push.apply(_, arraylike) throws
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var style,
		elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

			// Use of this method is a temporary fix (more like optimization) until something better comes along,
			// since it was removed from specification and supported only in FF
			style.display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = iframe[ 0 ].contentDocument;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {
		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		if ( elem.ownerDocument.defaultView.opener ) {
			return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
		}

		return window.getComputedStyle( elem, null );
	};



function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,
		style = elem.style;

	computed = computed || getStyles( elem );

	// Support: IE9
	// getPropertyValue is only needed for .css('filter') (#12537)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];
	}

	if ( computed ) {

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// Support: iOS < 6
		// A tribute to the "awesome hack by Dean Edwards"
		// iOS < 6 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
		// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
		if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?
		// Support: IE
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {
				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	var pixelPositionVal, boxSizingReliableVal,
		docElem = document.documentElement,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	if ( !div.style ) {
		return;
	}

	// Support: IE9-11+
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;" +
		"position:absolute";
	container.appendChild( div );

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computePixelPositionAndBoxSizingReliable() {
		div.style.cssText =
			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
			"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
			"border:1px;padding:1px;width:4px;position:absolute";
		div.innerHTML = "";
		docElem.appendChild( container );

		var divStyle = window.getComputedStyle( div, null );
		pixelPositionVal = divStyle.top !== "1%";
		boxSizingReliableVal = divStyle.width === "4px";

		docElem.removeChild( container );
	}

	// Support: node.js jsdom
	// Don't assume that getComputedStyle is a property of the global object
	if ( window.getComputedStyle ) {
		jQuery.extend( support, {
			pixelPosition: function() {

				// This test is executed only once but we still do memoizing
				// since we can use the boxSizingReliable pre-computing.
				// No need to check if the test was already performed, though.
				computePixelPositionAndBoxSizingReliable();
				return pixelPositionVal;
			},
			boxSizingReliable: function() {
				if ( boxSizingReliableVal == null ) {
					computePixelPositionAndBoxSizingReliable();
				}
				return boxSizingReliableVal;
			},
			reliableMarginRight: function() {

				// Support: Android 2.3
				// Check if div with explicit width and no margin-right incorrectly
				// gets computed margin-right based on width of container. (#3333)
				// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
				// This support function is only executed once so no memoizing is needed.
				var ret,
					marginDiv = div.appendChild( document.createElement( "div" ) );

				// Reset CSS: box-sizing; display; margin; border; padding
				marginDiv.style.cssText = div.style.cssText =
					// Support: Firefox<29, Android 2.3
					// Vendor-prefix box-sizing
					"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
					"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
				marginDiv.style.marginRight = marginDiv.style.width = "0";
				div.style.width = "1px";
				docElem.appendChild( container );

				ret = !parseFloat( window.getComputedStyle( marginDiv, null ).marginRight );

				docElem.removeChild( container );
				div.removeChild( marginDiv );

				return ret;
			}
		});
	}
})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
	// Swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[0].toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// Both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// At this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// At this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// At this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// Check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// Use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = data_priv.get( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = data_priv.access( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display !== "none" || !hidden ) {
				data_priv.set( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

jQuery.extend({

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Support: IE9-11+
			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {
				style[ name ] = value;
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

// Support: Android 2.3
jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE9
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*.
					// Use string for doubling so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur(),
				// break the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = data_priv.get( elem, "fxshow" );

	// Handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// Ensure the complete handler is called before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// Height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE9-10 do not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			data_priv.get( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {
			style.display = "inline-block";
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always(function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		});
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = data_priv.access( elem, "fxshow", {} );
		}

		// Store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;

			data_priv.remove( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// Don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || data_priv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = data_priv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = data_priv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: iOS<=5.1, Android<=4.2+
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE<=11+
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: Android<=2.3
	// Options inside disabled selects are incorrectly marked as disabled
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE<=11+
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
})();


var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					elem[ propName ] = false;
				}

				elem.removeAttribute( name );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle;
		if ( !isXML ) {
			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ name ];
			attrHandle[ name ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				name.toLowerCase() :
				null;
			attrHandle[ name ] = handle;
		}
		return ret;
	};
});




var rfocusable = /^(?:input|select|textarea|button)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each(function() {
			delete this[ jQuery.propFix[ name ] || name ];
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				return elem.hasAttribute( "tabindex" ) || rfocusable.test( elem.nodeName ) || elem.href ?
					elem.tabIndex :
					-1;
			}
		}
	}
});

if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			proceed = typeof value === "string" && value,
			i = 0,
			len = this.length;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			proceed = arguments.length === 0 || typeof value === "string" && value,
			i = 0,
			len = this.length;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// Toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					data_priv.set( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : data_priv.get( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// Handle most common string cases
					ret.replace(rreturn, "") :
					// Handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// IE6-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];
					if ( (option.selected = jQuery.inArray( option.value, values ) >= 0) ) {
						optionSet = true;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



// Support: Android 2.3
// Workaround failure to string-cast null input
jQuery.parseJSON = function( data ) {
	return JSON.parse( data + "" );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE9
	try {
		tmp = new DOMParser();
		xml = tmp.parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Document location
	ajaxLocation = window.location.href,

	// Segment location into parts
	ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType[0] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

		// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,
			// URL without anti-cache param
			cacheURL,
			// Response headers
			responseHeadersString,
			responseHeaders,
			// timeout handle
			timeoutTimer,
			// Cross-domain detection vars
			parts,
			// To know if global events are to be dispatched
			fireGlobals,
			// Loop variable
			i,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// Shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		var wrap;

		if ( jQuery.isFunction( html ) ) {
			return this.each(function( i ) {
				jQuery( this ).wrapAll( html.call(this, i) );
			});
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function( i ) {
				jQuery( this ).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0;
};
jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


jQuery.ajaxSettings.xhr = function() {
	try {
		return new XMLHttpRequest();
	} catch( e ) {}
};

var xhrId = 0,
	xhrCallbacks = {},
	xhrSuccessStatus = {
		// file protocol always yields status code 0, assume 200
		0: 200,
		// Support: IE9
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE9
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]();
		}
	});
}

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport(function( options ) {
	var callback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr(),
					id = ++xhrId;

				xhr.open( options.type, options.url, options.async, options.username, options.password );

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers["X-Requested-With"] ) {
					headers["X-Requested-With"] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							delete xhrCallbacks[ id ];
							callback = xhr.onload = xhr.onerror = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {
								complete(
									// file: protocol always yields status 0; see #8605, #14207
									xhr.status,
									xhr.statusText
								);
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,
									// Support: IE9
									// Accessing binary-data responseText throws an exception
									// (#11426)
									typeof xhr.responseText === "string" ? {
										text: xhr.responseText
									} : undefined,
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				xhr.onerror = callback("error");

				// Create the abort callback
				callback = xhrCallbacks[ id ] = callback("abort");

				try {
					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {
					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
});




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {
	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery("<script>").prop({
					async: true,
					charset: s.scriptCharset,
					src: s.url
				}).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = jQuery.trim( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};




var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf("auto") > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			elem = this[ 0 ],
			box = { top: 0, left: 0 },
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// Support: BlackBerry 5, iOS 3 (original iPhone)
		// If we don't have gBCR, just use 0,0 rather than error
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top + win.pageYOffset - docElem.clientTop,
			left: box.left + win.pageXOffset - docElem.clientLeft
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// Assume getBoundingClientRect is there when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : window.pageXOffset,
					top ? val : window.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Support: Safari<7+, Chrome<37+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://code.google.com/p/chromium/issues/detail?id=229280
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));

; browserify_shim__define__module__export__(typeof $ != "undefined" ? $ : window.$);

}).call(global, undefined, undefined, undefined, undefined, function defineExport(ex) { module.exports = ex; });

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],3:[function(require,module,exports){
var $ = require('jquery');
require('pjax');
require('./plugins/isVisible');
var loadWidgets = require('./modules/loadWidgets');

$(function() {


  var widgetsLoaded = false;
  var disqusLoaded = false;

  function resetWidgetStates() {
    widgetsLoaded = false;
    disqusLoaded = false;
    $(window).unbind('scroll');
  }

  // Stagger loading of plugins to improve pageload/render performance
  var refreshWidgets = function() {

    loadWidgets.triggerAnalytics();

    if ($('#disqus_thread').length !== 0) {
      console.log('Disqus exists!');

      $(window).scroll(function() {
        // console.log('scrolling');
        // console.log($('#disqus_thread').visible(true));
        // console.log($('.social').visible(true));

        if ($('.social').visible(true) && !widgetsLoaded) {
          loadWidgets.loadFacebookLikes();
          loadWidgets.loadTwitterWidgets();
          loadWidgets.loadGoogleWidgets(); 
          widgetsLoaded = true;
        }

        if ($('#disqus_thread').visible(true) && !disqusLoaded) {
          loadWidgets.loadDisqus();
          disqusLoaded = true;
        }

      });

    }

  }

  $.pjax({
    area: '.site-body', 
    // callback: function() {
    //   console.log('page load callback - hopefully last?');
    // },
    load: {
      head: 'Base, meta, link'
      // css: true ,
      // script: true
    },
    Cache: {
      click: true,
      // Submit: false,
      popstate: true  
    },
    wait: 0,
    callback: function() {
      refreshWidgets();
    },
    rewrite: function(document, area, host) {
      // console.log('Rewriting page parts');
    }
  })

  $(document).bind('pjax:fetch', function() {
    // console.log('fetching new page');
    resetWidgetStates();
  });



  window.onload = function() {
    require('./modules/rhythm');
  }

});
},{"./modules/loadWidgets":4,"./modules/rhythm":5,"./plugins/isVisible":6,"jquery":2,"pjax":1}],4:[function(require,module,exports){
function loadFacebookLikes() {
  try{
      FB.XFBML.parse(); 
  }catch(ex){}
}

function loadTwitterWidgets() {
  twttr.widgets.load();
}

function loadGoogleWidgets() {
  gapi.plusone.go();
}

function loadDisqus() {
  var disqus_shortname = 'scottyvernon';

  (function() {
      var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
      dsq.src = 'http://' + disqus_shortname + '.disqus.com/embed.js';
      (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
  })();
}

function triggerAnalytics() {
  if (window.location.hostname != 'localhost') {
    _gs('track');
  }
}

module.exports = {
  loadFacebookLikes: loadFacebookLikes,
  loadTwitterWidgets: loadTwitterWidgets,
  loadGoogleWidgets: loadGoogleWidgets,
  loadDisqus: loadDisqus,
  triggerAnalytics: triggerAnalytics
}
},{}],5:[function(require,module,exports){
function fixRhythm($el, height) {
  // var baseline = 16;
  // var remainder = height % baseline;

  var body_font_size_px   = parseFloat($('body').css('font-size'));
  var body_line_height_px = parseFloat($('body').css('line-height'));
  var body_line_height_rem = body_line_height_px / body_font_size_px;

  var baseline = body_line_height_px / 2;
  var remainder = height % baseline;
  var invertRemainder = baseline - remainder;

  console.log('Line height:', baseline);
  console.log('Disqus height:', height);
  console.log('Remainder:', invertRemainder);

  if (remainder > 0) {
    $el.css({
      'padding-bottom': invertRemainder + "px"
    });
    console.log('Fixing height.');
  }

}

function fixDisqusRhythm() {

  if ($('#disqus_thread').length !== 0) {

    var $disqus = $('#disqus_thread');

    var editable = true; // set a flag
    var disqusInitTest = setInterval(function() {
    // Initially Disqus renders this div with the height of 0px prior to the comments being loaded. So run a check to see if the comments have been loaded yet.
    console.log('interval');

      var disqusHeight = $disqus.height();
      if ( disqusHeight > 0 ) {
        if (editable) { // To make sure that the changes you want to make only happen once check to see if the flag has been changed, if not run the changes and update the flag.
          editable = false;
          clearInterval(disqusInitTest);
          // console.log('hello? disqus loaded');
          // Your code here...
          fixRhythm($disqus, disqusHeight);
        }
      }
    }, 2000);
  }

}

module.exports = fixDisqusRhythm();
},{}],6:[function(require,module,exports){
var $ = require('jquery');

(function($){

    /**
     * Copyright 2012, Digital Fusion
     * Licensed under the MIT license.
     * http://teamdf.com/jquery-plugins/license/
     *
     * @author Sam Sehnert
     * @desc A small plugin that checks whether elements are within
     *       the user visible viewport of a web browser.
     *       only accounts for vertical position, not horizontal.
     */
    var $w = $(window);
    $.fn.visible = function(partial,hidden,direction){

        if (this.length < 1)
            return;

        var $t        = this.length > 1 ? this.eq(0) : this,
            t         = $t.get(0),
            vpWidth   = $w.width(),
            vpHeight  = $w.height(),
            direction = (direction) ? direction : 'both',
            clientSize = hidden === true ? t.offsetWidth * t.offsetHeight : true;

        if (typeof t.getBoundingClientRect === 'function'){

            // Use this native browser method, if available.
            var rec = t.getBoundingClientRect(),
                tViz = rec.top    >= 0 && rec.top    <  vpHeight,
                bViz = rec.bottom >  0 && rec.bottom <= vpHeight,
                lViz = rec.left   >= 0 && rec.left   <  vpWidth,
                rViz = rec.right  >  0 && rec.right  <= vpWidth,
                vVisible   = partial ? tViz || bViz : tViz && bViz,
                hVisible   = partial ? lViz || rViz : lViz && rViz;

            if(direction === 'both')
                return clientSize && vVisible && hVisible;
            else if(direction === 'vertical')
                return clientSize && vVisible;
            else if(direction === 'horizontal')
                return clientSize && hVisible;
        } else {

            var viewTop         = $w.scrollTop(),
                viewBottom      = viewTop + vpHeight,
                viewLeft        = $w.scrollLeft(),
                viewRight       = viewLeft + vpWidth,
                offset          = $t.offset(),
                _top            = offset.top,
                _bottom         = _top + $t.height(),
                _left           = offset.left,
                _right          = _left + $t.width(),
                compareTop      = partial === true ? _bottom : _top,
                compareBottom   = partial === true ? _top : _bottom,
                compareLeft     = partial === true ? _right : _left,
                compareRight    = partial === true ? _left : _right;

            if(direction === 'both')
                return !!clientSize && ((compareBottom <= viewBottom) && (compareTop >= viewTop)) && ((compareRight <= viewRight) && (compareLeft >= viewLeft));
            else if(direction === 'vertical')
                return !!clientSize && ((compareBottom <= viewBottom) && (compareTop >= viewTop));
            else if(direction === 'horizontal')
                return !!clientSize && ((compareRight <= viewRight) && (compareLeft >= viewLeft));
        }
    };

})(jQuery);
},{"jquery":2}]},{},[3]);
