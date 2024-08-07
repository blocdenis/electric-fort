(function () {
  'use strict';
  try {
    if (typeof document != 'undefined') {
      var e = document.createElement('style');
      e.appendChild(
        document.createTextNode(
          '.spinner{display:block;position:absolute;width:14px;height:14px}.spinner span{box-sizing:border-box;display:block;position:absolute;width:14px;height:14px;border:1px solid #fff;border-radius:50%;animation:spinner 1.2s cubic-bezier(.5,0,.5,1) infinite;border-color:#000 transparent transparent transparent}.spinner span:nth-child(1){animation-delay:-.45s}.spinner span:nth-child(2){animation-delay:-.3s}.spinner span:nth-child(3){animation-delay:-.15s}@keyframes spinner{0%{transform:rotate(0)}to{transform:rotate(360deg)}}:root{--np-select-error: tomato;--np-select-white: #fff;--np-select-text: #221f1f;--np-select-active: #e5f5ec;--np-select-disabled: #d2d2d2;--np-select-box-shadow: #221f1f40}.np-select{width:400px;position:relative;height:40px;z-index:2}.np-select *{box-sizing:border-box;font-family:sans-serif}.np-select__button{width:100%;height:40px;padding-left:12px;padding-right:40px;border:1px solid var(--np-select-disabled);border-radius:4px;background-color:var(--np-select-white);font-size:14px;line-height:36px;text-align:left;color:var(--np-select-text);cursor:pointer;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.np-select__button .icon{color:var(--np-select-text);position:absolute;top:50%;transform:translateY(-50%);right:12px;width:14px;height:9px}.np-select__button .icon svg{display:block;width:14px;height:9px}.np-select__button .loading{display:none;position:absolute;top:50%;transform:translateY(-50%);right:14px;height:14px;width:14px}.np-select__button:disabled{color:var(--np-select-disabled);cursor:default}.np-select__button:disabled svg{fill:var(--np-select-disabled)}.np-select__input{display:block;width:100%;height:40px;font-size:14px;background-color:var(--np-select-white);appearance:none;border-radius:8px;padding:0 12px;outline:none;margin:5px 0;position:absolute;top:40px;display:none}.np-select__box{max-height:210px;width:100%;overflow-y:scroll;box-shadow:0 2px 4px var(--np-select-box-shadow);background-color:var(--np-select-white);border:1px solid var(--np-select-disabled);border-radius:8px;position:absolute;top:90px;display:none}.np-select__placeholder{position:absolute;top:90px;left:0;width:100%;background:var(--np-select-white);text-align:center;padding:25px 10px;display:none;box-shadow:0 2px 4px var(--np-select-box-shadow);border-radius:8px;font-size:14px}.np-select__option{cursor:pointer;font-size:14px;padding:10px 16px;color:var(--np-select-text);outline:none}.np-select.open .np-select__box:not(.empty),.np-select.open .np-select__input{display:block}.np-select[aria-invalid=true] .np-select__button{border:1px solid var(--np-select-error);color:var(--np-select-error)}.np-select[aria-invalid=true] .np-select__button svg{fill:var(--np-select-error)}.np-select[aria-busy=true] .np-select__button .icon{display:none}.np-select[aria-busy=true] .np-select__button .loading{display:block}.np-select[aria-busy=true] .np-select__placeholder{top:45px}.np-select__option:hover,.np-select__option:focus,.np-select__option.selected{background:var(--np-select-active)}.np-select[aria-disabled=true] .np-select__placeholder{top:45px}.np-select.open .np-select__placeholder.empty{display:block}.np-select-root{position:relative;z-index:4}'
        )
      ),
        document.head.appendChild(e);
    }
  } catch (t) {
    console.error('vite-plugin-css-injected-by-js', t);
  }
})();
(function (r, p) {
  typeof exports == 'object' && typeof module != 'undefined'
    ? p(exports)
    : typeof define == 'function' && define.amd
    ? define(['exports'], p)
    : ((r = typeof globalThis != 'undefined' ? globalThis : r || self),
      p((r.NpSelect = {})));
})(this, function (r) {
  'use strict';
  var M = Object.defineProperty;
  var T = (r, p, c) =>
    p in r
      ? M(r, p, { enumerable: !0, configurable: !0, writable: !0, value: c })
      : (r[p] = c);
  var a = (r, p, c) => (T(r, typeof p != 'symbol' ? p + '' : p, c), c);
  var m = (r, p, c) =>
    new Promise((b, y) => {
      var v = (u) => {
          try {
            $(c.next(u));
          } catch (S) {
            y(S);
          }
        },
        L = (u) => {
          try {
            $(c.throw(u));
          } catch (S) {
            y(S);
          }
        },
        $ = (u) => (u.done ? b(u.value) : Promise.resolve(u.value).then(v, L));
      $((c = c.apply(r, p)).next());
    });
  const p = '',
    c = (s, e = 500) => {
      let t;
      return (...n) => {
        clearTimeout(t),
          (t = setTimeout(() => {
            s.apply(void 0, n);
          }, e));
      };
    },
    b = (s, e) => {
      document.addEventListener('click', (t) => {
        t.currentTarget !== s && !s.contains(t.target) && e();
      });
    },
    y = (s, e) => {
      const t = e.toLowerCase().split(' ');
      return s.filter((n) => t.every((o) => n.label.toLowerCase().includes(o)));
    },
    v = 'https://api.novaposhta.ua/v2.0/json/';
  class L {
    constructor(e) {
      a(this, 'API_URL');
      (this.config = e), (this.API_URL = v);
    }
    getNpCities(e) {
      return m(this, null, function* () {
        try {
          const t = yield fetch(
              this.API_URL,
              this.getConfig({
                modelName: 'Address',
                calledMethod: 'searchSettlements',
                methodProperties: { CityName: e, Limit: '30' },
              })
            ),
            { data: n } = yield t.json();
          return n[0].Addresses;
        } catch (t) {
          return [];
        }
      });
    }
    getNpWarehouses(e) {
      return m(this, null, function* () {
        try {
          const t = yield fetch(
              v,
              this.getConfig({
                modelName: 'Address',
                calledMethod: 'getWarehouses',
                methodProperties: { CityName: e },
              })
            ),
            { data: n } = yield t.json();
          return n;
        } catch (t) {
          return [];
        }
      });
    }
    getConfig(e) {
      return {
        body: JSON.stringify({
          apiKey: this.config.apiKey,
          modelName: e.modelName,
          calledMethod: e.calledMethod,
          methodProperties: e.methodProperties,
        }),
        method: 'POST',
      };
    }
  }
  const $ = ['Enter'],
    u = { option: 'np-select__option' },
    S =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 7"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.5 7a.956.956 0 01-.657-.256l-5.57-5.25a.839.839 0 010-1.237.968.968 0 011.312 0L6.5 4.888 11.415.257a.968.968 0 011.313 0 .839.839 0 010 1.237l-5.572 5.25A.956.956 0 016.5 7z"/></svg>',
    N =
      '<span class="spinner"><span></span><span></span><span></span><span></span></span>';
  class f {
    constructor({
      root: e,
      button: t,
      input: n,
      options: o = [],
      getOption: h,
      onSelect: i = () => {},
      onInput: l = () => {},
      onOpen: d = () => {},
      onMounted: O = () => {},
      apiKey: w,
    }) {
      a(this, 'options');
      a(this, 'filtered');
      a(this, 'open');
      a(this, 'value');
      a(this, 'button');
      a(this, 'input');
      a(this, 'placeholder');
      a(this, 'selected');
      a(this, 'disabled');
      a(this, 'loading');
      a(this, '$root');
      a(this, '$wrapper');
      a(this, '$button');
      a(this, '$input');
      a(this, '$select');
      a(this, '$placeholder');
      a(this, 'getOption');
      a(this, 'onSelect');
      a(this, 'onInput');
      a(this, 'onOpen');
      a(this, 'onMounted');
      a(this, 'api');
      if (!e)
        throw new TypeError(
          'NpSelect: root element is not passed or it is not valid'
        );
      w || console.error('NpSelect: apiKey is not passed'),
        (this.options = o.map((C) => h(C))),
        (this.filtered = o.map((C) => h(C))),
        (this.open = !1),
        (this.value = ''),
        (this.selected = ''),
        (this.button = t),
        (this.input = n),
        (this.disabled = !1),
        (this.loading = !1),
        (this.$root = e),
        (this.$wrapper = null),
        (this.$button = null),
        (this.$input = null),
        (this.$select = null),
        (this.$placeholder = null),
        (this.getOption = h),
        (this.onSelect = i),
        (this.onInput = l),
        (this.onOpen = d),
        (this.onMounted = O),
        (this.api = new L({ apiKey: w })),
        this.build();
    }
    validate() {
      const e = !!this.selected;
      return this.disabled ? !1 : ((this.$wrapper.ariaInvalid = `${!e}`), e);
    }
    setLoading(e) {
      (this.loading = e), (this.$wrapper.ariaBusy = `${e}`);
    }
    getLoading() {
      return this.loading;
    }
    setSelected(e) {
      (this.selected = e), this.setValue(e);
    }
    getSelected() {
      return {
        value: this.selected,
        option: this.options.find((e) => e.value === this.selected),
      };
    }
    setValue(e = '') {
      if (!e.length) {
        this.selected = '';
        return;
      }
      this.filtered.some((t) => t.value === e) &&
        ((this.selected = e), this.setButtonText(this.selected)),
        (this.value = e),
        (this.$input.value = e),
        this.createSelectOptions();
    }
    getValue() {
      return this.value;
    }
    setOptions(e) {
      (this.options = e.map((t) => this.getOption(t))),
        (this.filtered = e.map((t) => this.getOption(t))),
        this.setEmptyState(this.filtered),
        this.createSelectOptions();
    }
    getOptions() {
      return this.options;
    }
    setFiltered(e) {
      (this.filtered = e),
        this.setEmptyState(this.filtered),
        this.createSelectOptions();
    }
    getFiltered() {
      return this.filtered;
    }
    setOpen(e) {
      e ? this.handleOpen() : this.handleClose(), (this.open = e);
    }
    setDisabled(e) {
      (this.disabled = e),
        (this.$button.disabled = e),
        this.setButtonText(this.button.text || ''),
        (this.$wrapper.ariaDisabled = `${e}`);
    }
    build() {
      var t;
      const e = this.createSelect();
      this.options && this.createSelectOptions(),
        (this.$wrapper = e),
        this.$root.replaceChildren(e),
        (t = this.onMounted) == null || t.call(this, this),
        b(this.$root, () => this.setOpen(!1));
    }
    createSelect() {
      var l;
      const e = document.createElement('div');
      e.classList.add('np-select');
      const t = this.createButton();
      (this.$button = t), e.appendChild(t);
      const n = document.createElement('input');
      n.classList.add('np-select__input'),
        (n.name = this.input.name || ''),
        (n.placeholder = this.input.placeholder || ''),
        (n.autocomplete = 'off');
      const o = c((d) => this.handleInput(d));
      n.addEventListener('input', o),
        n.addEventListener('keydown', (d) => {
          d.code === 'ArrowDown' &&
            this.$select.querySelector(u.option).focus();
        }),
        e.appendChild(n),
        (this.$input = n);
      const h = document.createElement('div');
      h.classList.add('np-select__box', 'empty'),
        e.append(h),
        (this.$select = h);
      const i = document.createElement('div');
      return (
        i.classList.add('np-select__placeholder'),
        (i.textContent =
          ((l = this.placeholder) == null ? void 0 : l.text) ||
          'Nothing found.'),
        e.append(i),
        (this.$placeholder = i),
        e
      );
    }
    createSelectOptions() {
      this.$select.replaceChildren(),
        this.filtered.forEach((e) => {
          const t = document.createElement('div');
          t.classList.add('np-select__option'),
            (t.textContent = e.label),
            (t.tabIndex = 0),
            e.value === this.value && t.classList.add('selected'),
            t.addEventListener('click', () => this.handleSelect(t, e)),
            t.addEventListener('keydown', (n) => {
              $.includes(n.code) && this.handleSelect(t, e);
            }),
            this.$select.appendChild(t);
        });
    }
    createButton() {
      const e = document.createElement('button');
      e.classList.add('np-select__button'),
        (e.type = 'button'),
        e.addEventListener('click', () => {
          this.open ? this.handleClose() : this.handleOpen();
        });
      const t = document.createElement('span');
      t.classList.add('text'),
        (t.textContent = this.button.text || ''),
        e.appendChild(t);
      const n = document.createElement('span');
      n.classList.add('icon'), (n.innerHTML = S), e.appendChild(n);
      const o = document.createElement('span');
      return o.classList.add('loading'), (o.innerHTML = N), e.appendChild(o), e;
    }
    setButtonText(e) {
      const t = this.$button.querySelector('span.text');
      t.textContent = e;
    }
    setEmptyState(e) {
      e.length
        ? (this.$select.classList.remove('empty'),
          this.$placeholder.classList.remove('empty'))
        : (this.$select.classList.add('empty'),
          this.$placeholder.classList.add('empty'));
    }
    handleOpen() {
      var t;
      ((t = this.onOpen) == null ? void 0 : t.call(this, this)) === !1 &&
        this.setDisabled(!0),
        !this.disabled &&
          (this.$wrapper.classList.add('open'),
          this.$input.focus(),
          (this.open = !0));
    }
    handleClose() {
      this.$wrapper.classList.remove('open'), (this.open = !1);
    }
    handleSelect(e, t) {
      var n;
      this.$root
        .querySelectorAll(u.option)
        .forEach((o) => o.classList.remove('selected')),
        e.classList.add('selected'),
        this.handleClose(),
        this.setButtonText(t.label),
        (this.selected = t.value),
        (this.value = t.value),
        (this.$input.value = t.value),
        (n = this.onSelect) == null || n.call(this, t, this),
        this.validate();
    }
    handleInput(e) {
      var n;
      const t = e.target.value;
      (n = this.onInput) == null || n.call(this, t, this),
        (this.value = t),
        this.selected !== t &&
          ((this.selected = ''), this.createSelectOptions());
    }
  }
  const x = (s) => ({ label: s.Present, value: s.MainDescription }),
    E = (s) => {
      var t, n, o, h;
      const e = s.getOption || x;
      return new f({
        root: s.root,
        apiKey: s.apiKey,
        button: {
          text: ((t = s.button) == null ? void 0 : t.text) || 'Select City',
        },
        input: {
          name: ((n = s.input) == null ? void 0 : n.name) || 'city',
          placeholder:
            ((o = s.input) == null ? void 0 : o.placeholder) || 'Select City',
        },
        placeholder: {
          text:
            ((h = s.placeholder) == null ? void 0 : h.text) ||
            'No cities found. Try to change your input.',
        },
        onMounted: s.onMounted,
        onSelect: (i, l) =>
          m(this, null, function* () {
            var d;
            l.setSelected(i.value), (d = s.onSelect) == null || d.call(s, i, l);
          }),
        onInput: (i, l) =>
          m(this, null, function* () {
            if (i.length >= 3) {
              l.setLoading(!0);
              const d = yield l.api.getNpCities(i);
              l.setOptions(d), l.setLoading(!1);
            }
          }),
        getOption: e,
      });
    },
    _ = (s) => ({
      label: `№ ${s.Number}, ${s.ShortAddress}`,
      value: `№ ${s.Number}, ${s.ShortAddress}`,
    }),
    g = (s) => {
      var t, n, o, h;
      const e = s.getOption || _;
      return new f({
        root: s.root,
        apiKey: s.apiKey,
        button: {
          text:
            ((t = s.button) == null ? void 0 : t.text) || 'Select Warehouse',
        },
        input: {
          name: ((n = s.input) == null ? void 0 : n.name) || 'warehouse',
          placeholder:
            ((o = s.input) == null ? void 0 : o.placeholder) ||
            'Select Warehouse',
        },
        placeholder: {
          text:
            ((h = s == null ? void 0 : s.placeholder) == null
              ? void 0
              : h.text) || 'Nothing found.',
        },
        onMounted: (i) =>
          m(this, null, function* () {
            var l;
            if (s.city) {
              i.setLoading(!0);
              const d = yield i.api.getNpWarehouses(s.city);
              i.setOptions(d), i.setLoading(!1), i.setOpen(!0);
            }
            (l = s.onMounted) == null || l.call(s, i);
          }),
        onSelect: (i, l) =>
          m(this, null, function* () {
            var d;
            l.setSelected(i.value), (d = s.onSelect) == null || d.call(s, i, l);
          }),
        onInput: (i, l) =>
          m(this, null, function* () {
            const d = l.getOptions(),
              O = y(d, i);
            l.setFiltered(O);
          }),
        onOpen: s.onOpen,
        getOption: e,
      });
    },
    I = { validateMultiple: (s) => s.map((e) => e.validate()).every((e) => e) };
  (r.NpCitySelect = E),
    (r.NpWarehouseSelect = g),
    (r.utils = I),
    Object.defineProperty(r, Symbol.toStringTag, { value: 'Module' });
});
