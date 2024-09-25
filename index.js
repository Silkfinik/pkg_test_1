/---------------------------------------SOURCE-------------------------------------/;
const HSV = [0, 0, 0];
const XYZ = [0, 0, 0];
const LAB = [0, 0, 0];
const RGB = [0, 0, 0];

/--------------------------------------GET ELS-------------------------------------/;
//-------------------TEXT-------------------------//

//-----------TEXT-HSV--------------------/
const hText = document.getElementById("hsv_h_text");
const sText = document.getElementById("hsv_s_text");
const vText = document.getElementById("hsv_v_text");

//-----------TEXT-XYZ--------------------/
const xText = document.getElementById("xyz_x_text");
const yText = document.getElementById("xyz_y_text");
const zText = document.getElementById("xyz_z_text");

//-----------TEXT-LAB--------------------/
const lText = document.getElementById("lab_l_text");
const aText = document.getElementById("lab_a_text");
const bText = document.getElementById("lab_b_text");

//-------------------RANGE-------------------------//

//-----------RANGE-HSV--------------------/
const hRange = document.getElementById("hsv_h_range");
const sRange = document.getElementById("hsv_s_range");
const vRange = document.getElementById("hsv_v_range");

//-----------RANGE-XYZ--------------------/
const xRange = document.getElementById("xyz_x_range");
const yRange = document.getElementById("xyz_y_range");
const zRange = document.getElementById("xyz_z_range");

//-----------RANGE-LAB--------------------/
const lRange = document.getElementById("lab_l_range");
const aRange = document.getElementById("lab_a_range");
const bRange = document.getElementById("lab_b_range");

//-----------COLOR-PICKER-----------------/
const colorPicker = document.getElementById("color-picker");

/--------------------------------------SET VALUES-------------------------------------/;
//-------------------TEXT-------------------------/
const setTextHSV = (HSV) => {
  hText.value = HSV[0].toFixed(2);
  sText.value = HSV[1].toFixed(2);
  vText.value = HSV[2].toFixed(2);
};

const setTextXYZ = (XYZ) => {
  xText.value = XYZ[0].toFixed(2);
  yText.value = XYZ[1].toFixed(2);
  zText.value = XYZ[2].toFixed(2);
};

const setTextLAB = (LAB) => {
  lText.value = LAB[0].toFixed(2);
  aText.value = LAB[1].toFixed(2);
  bText.value = LAB[2].toFixed(2);
};

//-------------------RANGE-------------------------/
const setRangeHSV = (HSV) => {
  hRange.value = HSV[0];
  sRange.value = HSV[1];
  vRange.value = HSV[2];
};

const setRangeXYZ = (XYZ) => {
  xRange.value = XYZ[0];
  yRange.value = XYZ[1];
  zRange.value = XYZ[2];
};

const setRangeLAB = (LAB) => {
  lRange.value = LAB[0];
  aRange.value = LAB[1];
  bRange.value = LAB[2];
};

//-----------COLOR-PICKER--------------------------/
const setColorPicker = (RBG) => {
  const hex = RGBtoHEX(...RBG);
  colorPicker.value = hex;
};

//-------------------ALL----------------------------/
const setInputs = () => {
  setTextHSV(HSV);
  setRangeHSV(HSV);

  setTextXYZ(XYZ);
  setRangeXYZ(XYZ);

  setTextLAB(LAB);
  setRangeLAB(LAB);

  setColorPicker(RGB);
};

setInputs();

/--------------------SOURCE REPLACERS--------------------------/;
const replaceHSV = (hsv) => HSV.splice(0, HSV.length, ...hsv);
const replaceXYZ = (xyz) => XYZ.splice(0, XYZ.length, ...xyz);
const replaceLAB = (lab) => LAB.splice(0, LAB.length, ...lab);
const replaceRGB = (rgb) => RGB.splice(0, RGB.length, ...rgb);

/----------------------CONVERSIONS----------------------------------/;
const convertFromHSV = () => {
  const xyz = HSVtoXYZ(...HSV);
  replaceXYZ(xyz);

  const lab = XYZtoLAB(...XYZ);
  replaceLAB(lab);

  const rgb = HSVtoRGB(...HSV);
  replaceRGB(rgb);

  setInputs();
};

const convertFromXYZ = () => {
  const hsv = XYZtoHSV(...XYZ);
  replaceHSV(hsv);

  const lab = XYZtoLAB(...XYZ);
  replaceLAB(lab);

  const rgb = HSVtoRGB(...HSV);
  replaceRGB(rgb);

  setInputs();
};

const convertFromLAB = () => {
  const xyz = LABtoXYZ(...LAB);
  replaceXYZ(xyz);

  const hsv = XYZtoHSV(...XYZ);
  replaceHSV(hsv);

  const rgb = HSVtoRGB(...HSV);
  replaceRGB(rgb);

  setInputs();
};

const convertFromRGB = () => {
  const hsv = RGBtoHSV(...RGB);
  replaceHSV(hsv);
  const xyz = HSVtoXYZ(...HSV);
  replaceXYZ(xyz);
  const lab = XYZtoLAB(...XYZ);
  replaceLAB(lab);

  setInputs();
};
/------------------------HELPERS-----------------------------------/;

const getFloatValue = (e) => parseFloat(e.target.value);
const getConstraintsValue = (e) => {
  const min = parseFloat(e.target.min);
  const max = parseFloat(e.target.max);
  return { min, max };
};

const insertValidationMessage = (e, message) => {
  const inputBox = e.target.closest(".container");
  inputBox.append(createValidationMessage(message));
};

const removeValidationMessage = (e) => {
  const inputBox = e.target.closest(".container");
  const validateMessage = inputBox.querySelector("p");
  validateMessage?.remove();
};

const validateMinMax = (e, value) => {
  const { min, max } = getConstraintsValue(e);
  console.log({ min, max }, e.target);
  if (value < min) {
    value = min;
    insertValidationMessage(e, `Min value is ${min}`);
  } else if (value > max) {
    value = max;
    insertValidationMessage(e, `Max value is ${max}`);
  } else if (value || value === 0) {
    removeValidationMessage(e);
  } else {
    value = 0;
  }

  return value;
};

const createValidationMessage = (str) => {
  const p = document.createElement("p");
  p.innerText = str;
  p.setAttribute("style", "color: red; text-align: center;");
  return p;
};

/----------------------LISTENERS----------------------------------/;

hText.addEventListener("change", (e) => {
  let value = getFloatValue(e);
  let validValue = validateMinMax(e, value);
  HSV[0] = validValue;

  convertFromHSV();
});
hText.addEventListener("blur", (e) => {
  let value = getFloatValue(e);
  let validValue = validateMinMax(e, value);
  HSV[0] = validValue;

  convertFromHSV();
});
hRange.addEventListener("input", (e) => {
  let value = getFloatValue(e);
  let validValue = validateMinMax(e, value);
  HSV[0] = validValue;

  convertFromHSV();
});

sText.addEventListener("change", (e) => {
  let value = getFloatValue(e);
  let validValue = validateMinMax(e, value);
  HSV[1] = validValue;

  convertFromHSV();
});
sText.addEventListener("blur", (e) => {
  let value = getFloatValue(e);
  let validValue = validateMinMax(e, value);
  HSV[1] = validValue;

  convertFromHSV();
});
sRange.addEventListener("input", (e) => {
  let value = getFloatValue(e);
  let validValue = validateMinMax(e, value);
  HSV[1] = validValue;

  convertFromHSV();
});

vText.addEventListener("change", (e) => {
  let value = getFloatValue(e);
  let validValue = validateMinMax(e, value);
  HSV[2] = validValue;

  convertFromHSV();
});
vText.addEventListener("blur", (e) => {
  let value = getFloatValue(e);
  let validValue = validateMinMax(e, value);
  HSV[2] = validValue;

  convertFromHSV();
});
vRange.addEventListener("input", (e) => {
  let value = getFloatValue(e);
  let validValue = validateMinMax(e, value);
  HSV[2] = validValue;

  convertFromHSV();
});

//----------------------XYZ----------------------------------//

xText.addEventListener("change", (e) => {
  let value = getFloatValue(e);
  let validValue = validateMinMax(e, value);
  XYZ[0] = validValue;

  convertFromXYZ();
});
xText.addEventListener("blur", (e) => {
  let value = getFloatValue(e);
  let validValue = validateMinMax(e, value);
  XYZ[0] = validValue;

  convertFromXYZ();
});
xRange.addEventListener("input", (e) => {
  let value = getFloatValue(e);
  let validValue = validateMinMax(e, value);
  XYZ[0] = validValue;

  convertFromXYZ();
});

yText.addEventListener("change", (e) => {
  let value = getFloatValue(e);
  let validValue = validateMinMax(e, value);
  XYZ[1] = validValue;

  convertFromXYZ();
});
yText.addEventListener("blur", (e) => {
  let value = getFloatValue(e);
  let validValue = validateMinMax(e, value);
  XYZ[1] = validValue;

  convertFromXYZ();
});
yRange.addEventListener("input", (e) => {
  let value = getFloatValue(e);
  let validValue = validateMinMax(e, value);
  XYZ[1] = validValue;

  convertFromXYZ();
});

zText.addEventListener("change", (e) => {
  let value = getFloatValue(e);
  let validValue = validateMinMax(e, value);
  XYZ[2] = validValue;

  convertFromXYZ();
});
zText.addEventListener("blur", (e) => {
  let value = getFloatValue(e);
  let validValue = validateMinMax(e, value);
  XYZ[2] = validValue;

  convertFromXYZ();
});
zRange.addEventListener("input", (e) => {
  let value = getFloatValue(e);
  let validValue = validateMinMax(e, value);
  XYZ[2] = validValue;

  convertFromXYZ();
});
//---------------------------LAB-----------------------------//

lText.addEventListener("change", (e) => {
  let value = getFloatValue(e);
  let validValue = validateMinMax(e, value);
  LAB[0] = validValue;

  convertFromLAB();
});
lText.addEventListener("blur", (e) => {
  let value = getFloatValue(e);
  let validValue = validateMinMax(e, value);
  LAB[0] = validValue;

  convertFromLAB();
});
lRange.addEventListener("input", (e) => {
  let value = getFloatValue(e);
  let validValue = validateMinMax(e, value);
  LAB[0] = validValue;

  convertFromLAB();
});

aText.addEventListener("change", (e) => {
  let value = getFloatValue(e);
  let validValue = validateMinMax(e, value);
  LAB[1] = validValue;

  convertFromLAB();
});
aText.addEventListener("blur", (e) => {
  let value = getFloatValue(e);
  let validValue = validateMinMax(e, value);
  LAB[1] = validValue;

  convertFromLAB();
});

aRange.addEventListener("input", (e) => {
  let value = getFloatValue(e);
  let validValue = validateMinMax(e, value);
  LAB[1] = validValue;

  convertFromLAB();
});

bText.addEventListener("change", (e) => {
  let value = getFloatValue(e);
  let validValue = validateMinMax(e, value);
  LAB[2] = validValue;

  convertFromLAB();
});
bText.addEventListener("blur", (e) => {
  let value = getFloatValue(e);
  let validValue = validateMinMax(e, value);
  LAB[2] = validValue;

  convertFromLAB();
});
bRange.addEventListener("input", (e) => {
  let value = getFloatValue(e);
  let validValue = validateMinMax(e, value);
  LAB[2] = validValue;

  convertFromLAB();
});

//------------------------COLOR-PICKER----------------------------//

colorPicker.addEventListener("input", (e) => {
  const value = e.target.value;
  console.log("value", value);
  const rgb = HEXtoRGB(value);
  replaceRGB(rgb);

  convertFromRGB();
});

/--------------------CONVERT FUNCTIONS-----------------------------/;
function RGBtoHEX(r, g, b) {
  r = Math.round(r * 255);
  g = Math.round(g * 255);
  b = Math.round(b * 255);

  const hex =
    "#" +
    ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();

  console.log("hex", hex);
  return hex;
}

function HSVtoRGB(h, s, v) {
  console.log(h, s, v);
  h /= 360;
  s /= 100;
  v /= 100;
  let r, g, b;

  let i = Math.floor(h * 6);
  let f = h * 6 - i;
  let p = v * (1 - s);
  let q = v * (1 - f * s);
  let t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0:
      r = v;
      g = t;
      b = p;
      break;
    case 1:
      r = q;
      g = v;
      b = p;
      break;
    case 2:
      r = p;
      g = v;
      b = t;
      break;
    case 3:
      r = p;
      g = q;
      b = v;
      break;
    case 4:
      r = t;
      g = p;
      b = v;
      break;
    case 5:
      r = v;
      g = p;
      b = q;
      break;
  }
  return [r, g, b];
}

function HSVtoXYZ(h, s, v) {
  h /= 360;
  s /= 100;
  v /= 100;
  function HSVtoRGB(h, s, v) {
    let r, g, b;

    let i = Math.floor(h * 6);
    let f = h * 6 - i;
    let p = v * (1 - s);
    let q = v * (1 - f * s);
    let t = v * (1 - (1 - f) * s);

    switch (i % 6) {
      case 0:
        r = v;
        g = t;
        b = p;
        break;
      case 1:
        r = q;
        g = v;
        b = p;
        break;
      case 2:
        r = p;
        g = v;
        b = t;
        break;
      case 3:
        r = p;
        g = q;
        b = v;
        break;
      case 4:
        r = t;
        g = p;
        b = v;
        break;
      case 5:
        r = v;
        g = p;
        b = q;
        break;
    }

    return [r, g, b];
  }

  function RGBtoXYZ(r, g, b) {
    function inverseCompand(c) {
      return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    }

    r = inverseCompand(r);
    g = inverseCompand(g);
    b = inverseCompand(b);

    let x = r * 0.4124 + g * 0.3576 + b * 0.1805;
    let y = r * 0.2126 + g * 0.7152 + b * 0.0722;
    let z = r * 0.0193 + g * 0.1192 + b * 0.9505;

    return [x * 100, y * 100, z * 100];
  }

  let [r, g, b] = HSVtoRGB(h, s, v);
  let [x, y, z] = RGBtoXYZ(r, g, b);

  return [x, y, z];
}

function XYZtoLAB(x, y, z) {
  // Опорная белая точка D65
  let Xn = 95.047;
  let Yn = 100.0;
  let Zn = 108.883;

  x = x / Xn;
  y = y / Yn;
  z = z / Zn;

  // Функция F(x) с условиями
  function F(t) {
    return t >= 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116;
  }

  // Применяем функцию F(x)
  let fx = F(x);
  let fy = F(y);
  let fz = F(z);

  //

  // Логируем промежуточные значения для отладки
  console.log("fx:", fx, "fy:", fy, "fz:", fz);

  // Рассчет L, a и b
  let L = 116 * fy - 16;
  let a = 500 * (fx - fy);
  let b = 200 * (fy - fz);

  // Логируем результат
  console.log("L:", L, "a:", a, "b:", b);

  return [L, a, b];
}

function RGBtoHSV(r, g, b) {
  console.log("rgb to hsv ", r, g, b);

  // r, g, b уже в диапазоне [0, 1], масштабирование не требуется
  let max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  console.log(max);

  let h,
    s,
    v = max;

  let d = max - min;
  s = max === 0 ? 0 : d / max;

  if (max === min) {
    h = 0; // ахроматический
  } else {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return [h * 360, s * 100, v * 100];
}

function XYZtoHSV(x, y, z) {
  x /= 100;
  y /= 100;
  z /= 100;
  function XYZtoRGB(x, y, z) {
    let r = x * 3.2406 + y * -1.5372 + z * -0.4986;
    let g = x * -0.9689 + y * 1.8758 + z * 0.0415;
    let b = x * 0.0557 + y * -0.204 + z * 1.057;

    function compand(c) {
      return c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
    }

    r = compand(r);
    g = compand(g);
    b = compand(b);

    r = Math.min(Math.max(0, r), 1);
    g = Math.min(Math.max(0, g), 1);
    b = Math.min(Math.max(0, b), 1);

    return [r, g, b];
  }

  function RGBtoHSV(r, g, b) {
    let max = Math.max(r, g, b),
      min = Math.min(r, g, b);
    let h,
      s,
      v = max;

    let d = max - min;
    s = max === 0 ? 0 : d / max;

    if (max === min) {
      h = 0;
    } else {
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }

    return [h * 360, s * 100, v * 100];
  }

  let [r, g, b] = XYZtoRGB(x, y, z);

  let [h, s, v] = RGBtoHSV(r, g, b);

  return [h, s, v];
}

function LABtoXYZ(L, a, b) {
  // Опорная белая точка D65
  let Xn = 95.047;
  let Yn = 100.0;
  let Zn = 108.883;

  // Функция F(x) для обратного преобразования
  function F_inv(t) {
    let t3 = Math.pow(t, 3);
    return t3 > 0.008856 ? t3 : (t - 16 / 116) / 7.787;
  }

  console.log("L:", L, "A:", a, "B:", b);

  // Преобразование из LAB в XYZ
  let fy = (Number(L) + 16) / 116;
  console.log(L + 16);
  let fx = a / 500 + fy;
  let fz = fy - b / 200;

  console.log("fx:", fx, "fy:", fy, "fz:", fz);

  let x = F_inv(fx) * Xn;
  let y = F_inv(fy) * Yn;
  let z = F_inv(fz) * Zn;

  console.log("X:", x, "Y:", y, "Z:", z);
  return [x, y, z];
}

function HEXtoRGB(hex) {
  hex = hex.replace(/^#/, "");

  if (hex.length === 3) {
    hex = hex
      .split("")
      .map(function (h) {
        return h + h;
      })
      .join("");
  }

  let r = parseInt(hex.substring(0, 2), 16) / 255;
  let g = parseInt(hex.substring(2, 4), 16) / 255;
  let b = parseInt(hex.substring(4, 6), 16) / 255;

  console.log("r", r, "g", g, "b", b);
  return [r, g, b];
}
