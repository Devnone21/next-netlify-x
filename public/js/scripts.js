async function getSettings(host, id) {
  const response = await fetch(host+'?k='+id);
  const data = await response.json();
  return data.settings;
}

async function putSettings(host, id, value) {
  const comment = "From putSettings";
  const response = await fetch(host+'?k='+id, 
        { method: "PUT", body: JSON.stringify({rayId: rayId, _comment: comment, settings: value}), 
        headers: {'Content-Type': 'application/json'} });
  const data = await response.json();
  return data.settings;
}

const elm = (id) => document.getElementById(id);
let profiles;

if (document.readyState !== 'loading') {
    console.log('document is already ready, just execute code here');
    initSettings();
} else {
    document.addEventListener('DOMContentLoaded', function () {
        console.log('document was not ready, place code here');
        initSettings();
    });
}

async function initSettings() {
    console.log(ENV_);
    profiles = await getSettings(ENV_['APIURL'], ENV_['RAYID']);
    console.log(profiles);
    const selectClasses = "form-select shadow-none row border-top".split(' ');
    document.querySelectorAll('select').forEach(el=>el.classList.add(...selectClasses));
    createOptions("accDropdown", ENV_['ACC']);
    createOptions("tfDropdown",  ENV_['TF']);
    createOptions("vlDropdown",  ENV_['VL']);
    createOptions("tpDropdown",  ENV_['TP']);
    createOptions("slDropdown",  ENV_['SL']);
    createOptions("indDropdown", ENV_['IND']);
    if (profiles.length >0) {
        let appDropdown = elm('appDropdown');
        profiles.forEach(element => {
            let opt = document.createElement("option");
            opt.setAttribute("value", element.appName);
            opt.textContent = element.appName;
            appDropdown.appendChild(opt);
        });
        appDropdown.addEventListener("change", reflectSetting);
    }
    elm('indDropdown').addEventListener("change", updateOptionPreset);
    elm('btnPreview').addEventListener("click", previewSetting);
    elm('btnSave').addEventListener("click", putSetting);
    createBtnCheck("sbBtncheck", ENV_['SB']);
}

function reflectSetting() {
    const appName = elm('appDropdown').value;
    if (appName == '') { 
        elm('tableSetting').classList.add("visually-hidden");
        return false;
    }
    const appIndex = profiles.findIndex(o => o.appName === appName);
    elm('currentAppIndex').value = appIndex;
    const setting = profiles[appIndex].setting;
    elm('accDropdown').value = setting.account;
    elm('tfDropdown').value  = setting.timeframe;
    elm('vlDropdown').value  = setting.volume;
    elm('tpDropdown').value  = setting.rate_tp;
    elm('slDropdown').value  = setting.rate_sl;
    elm('indDropdown').value = setting.indicator;
    // preset option depends on indicator
    updateOptionPreset();
    elm('presetDropdown').value = setting.indPreset;
    // smb state
    ENV_['SB'].forEach(sb => {
        elm(sb).checked = setting.symbols.includes(sb)
    });
    // breaker
    elm('brkSwitch').checked = setting.breaker;
    elm('brkStatus').textContent = (setting.breaker)? "current: ON" : "current: OFF";
    // unhide
    elm('tableSetting').classList.remove("visually-hidden");
    return true;
}

function updateOptionPreset() {
    const indicator = elm('indDropdown').value;
    const preset = ENV_['PSET'][indicator];
    elm('presetDropdown').textContent = '';
    createOptions('presetDropdown', preset);
}

function createOptions(dropdownId, list) {
    let dropdown = elm(dropdownId);
    list.forEach(element => {
        let opt = document.createElement("option");
        opt.setAttribute("value", element);
        opt.textContent = element;
        dropdown.appendChild(opt);
    });
}

function createBtnCheck(groupId, list) {
    let arr = list.map(sb => `
        <input type="checkbox" class="btn-check" id="${sb}" autocomplete="off">
        <label class="btn btn-outline-primary" for="${sb}">${sb}</label>
    `);
    arr.splice(3, 0, "<br/>");
    elm(groupId).innerHTML = `${arr.join('')}`;
}

function generateSetting() {
    const setting = {
        account : elm('accDropdown').value,
        breaker : elm('brkSwitch').checked,
        symbols : ENV_['SB'].filter(sb => elm(sb).checked),
        timeframe : elm('tfDropdown').value,
        volume  : elm('vlDropdown').value,
        rate_tp : elm('tpDropdown').value,
        rate_sl : elm('slDropdown').value,
        indicator : elm('indDropdown').value,
        indPreset : elm('presetDropdown').value
    }
    return setting;
}

function previewSetting() {
    const setting = generateSetting();
    elm('previewSettings').textContent = JSON.stringify(setting, undefined, 2);
}

async function putSetting() {
    const setting = generateSetting();
    const appIndex = elm('currentAppIndex').value;
    profiles[appIndex].setting = setting;
    profiles = await putSettings(ENV_['APIURL'], ENV_['RAYID'], profiles);
    console.log(profiles);
    reflectSetting();
}
