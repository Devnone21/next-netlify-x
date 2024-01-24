async function getSettings(host, id) {
  const response = await fetch(host+'?k='+id);
  const data = await response.json();
  console.log(`get: ${JSON.stringify(data)}`);
  return data.profiles;
}

async function putSettings(host, id, value) {
  const comment = "From putSettings";
  const response = await fetch(host+'?k='+id, 
        { method: "PUT", body: JSON.stringify({rayId: ENV_['RAYID'], _comment: comment, profiles: value}), 
        headers: {'Content-Type': 'application/json'} });
  const data = await response.json();
  console.log(`put: ${JSON.stringify(data)}`)
  return data.profiles;
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
        createAppOptions(profiles);
    }
    elm('indDropdown').addEventListener("change", updateOptionPreset);
    // elm('btnPreview').addEventListener("click", previewSetting);
    elm('btnSave').addEventListener("click", putSetting);
    createBtnCheck("sbBtncheck", ENV_['SB']);
}

function reflectSetting() {
    const appName = elm('appDropdown').value;
    if (appName == '') { 
        elm('tableSetting').classList.add("visually-hidden");
        return false;
    }
    const appIndex = profiles.findIndex(o => o.name === appName);
    elm('currentAppIndex').value = appIndex;
    const param = profiles[appIndex].param;
    elm('accDropdown').value = param.account;
    elm('tfDropdown').value  = param.timeframe;
    elm('vlDropdown').value  = param.volume;
    elm('tpDropdown').value  = param.rate_tp;
    elm('slDropdown').value  = param.rate_sl;
    elm('indDropdown').value = param.indicator;
    // preset option depends on indicator
    updateOptionPreset();
    elm('presetDropdown').value = param.ind_preset;
    // smb state
    ENV_['SB'].forEach(sb => {
        elm(sb).checked = param.symbols.includes(sb)
    });
    // breaker
    elm('brkSwitch').checked = param.breaker;
    elm('brkStatus').textContent = (param.breaker)? "current: ON" : "current: OFF";
    // unhide
    elm('tableSetting').classList.remove("visually-hidden");
    return true;
}

function updateOptionPreset() {
    const indicator = elm('indDropdown').value;
    elm('presetDropdown').textContent = '';
    if (indicator) {
        const preset = ENV_['PSET'][indicator];
        createOptions('presetDropdown', preset);
    }
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

function addNewProfile(name) {
    insertProfile(name)
        .then(createAppOptions(profiles))
}

function insertProfile(name){
    let newProfile = {name:name,param:{}};
    return new Promise(resolve => { 
        newProfile.param = {account:'',breaker:false,symbols:[],timeframe:15,volume:0.01,rate_tp:0,rate_sl:0,indicator:''};
        profiles.push(newProfile);
        resolve(profiles);
    });
}

function createAppOptions(apps) {
    let appDropdown = elm('appDropdown');
    return new Promise(resolve => {
        appDropdown.innerHTML = '';
        apps.forEach(element => {
            let opt = document.createElement("option");
            opt.setAttribute("value", element.name);
            opt.textContent = element.name;
            appDropdown.appendChild(opt);
        });
        appDropdown.addEventListener("change", reflectSetting);
        resolve(appDropdown);
    });
}

function generateSetting() {
    const param = {
        account : elm('accDropdown').value,
        breaker : elm('brkSwitch').checked,
        symbols : ENV_['SB'].filter(sb => elm(sb).checked),
        timeframe : parseInt(elm('tfDropdown').value),
        volume  : parseFloat(elm('vlDropdown').value),
        rate_tp : parseFloat(elm('tpDropdown').value),
        rate_sl : parseFloat(elm('slDropdown').value),
        indicator : elm('indDropdown').value,
        ind_preset : elm('presetDropdown').value
    }
    return param;
}

function previewSetting() {
    const param = generateSetting();
    elm('previewSettings').textContent = JSON.stringify(param, undefined, 2);
}

async function putSetting() {
    const param = generateSetting();
    const appIndex = elm('currentAppIndex').value;
    profiles[appIndex].param = param;
    profiles = await putSettings(ENV_['APIURL'], ENV_['RAYID'], profiles);
    console.log(profiles);
    reflectSetting();
}
