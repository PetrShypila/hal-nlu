import { Languages } from "hal-protocols";

interface ILanguageModel {
  intents: IIntent[];
  types: IType;
}

interface IIntent {
  name: string;
  slots?: ISlot[];
  samples: string[];
}

interface ISlot {
  name: string;
}

interface IType {
  [ slotName: string ]: ITypeValue;
}

interface ITypeValue {
  value: string;
}

const script: Map<Languages, ILanguageModel> = new Map();
script["english"] = {
  intents: [
    {
      name: "PersonalDataScript",
      samples: [
        "buy.+insurance",
      ],
      slots: [],
    },
    {
      name: "NumberIntent",
      samples: [
        "{NumberSlot}",
      ],
      slots: [
        {
          name: "NumberSlot",
        },
      ],
    },
    {
      name: "PersonalNameIntent",
      samples: [
        "My name is {AnySlot}",
        "My name is {AnySlot} {AnySlot}",
      ],
      slots: [
        {
          name: "AnySlot",
        },
      ],
    },
  ],
  types: {
    AnySlot: {
      value: "[a-zA-Z]+",
    },
    NumberSlot: {
      value: "[0-9]+",
    },
  },
};

script["german"] = {
  intents: [
    {
      name: "NumberIntent",
      samples: [
        "{NumberSlot}",
      ],
      slots: [
        {
          name: "NumberSlot",
        },
      ],
    },
  ],
  types: {
    AnySlot: {
      value: "[a-zA-Z]+",
    },
    NumberSlot: {
      value: "[0-9]+",
    },
  },
};


export default script;
