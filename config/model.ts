import { Languages } from 'alfred-protocols';

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
  name: string
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
      slots: [],
      samples: [
        "buy.+insurance"
      ]
    },
    {
      name: "NumberIntent",
      slots: [
        {
          name: "NumberSlot"
        }
      ],
      samples: [
        "{NumberSlot}"
      ],
    },
    {
      name: "PersonalNameIntent",
      slots: [
        {
          name: "AnySlot",
        }
      ],
      samples: [
        "My name is {AnySlot}",
        "My name is {AnySlot} {AnySlot}",
      ],
    }
  ],
  types: {
    AnySlot: {
      value: "[a-zA-Z]+"
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
      slots: [
        {
          name: "NumberSlot"
        }
      ],
      samples: [
        "{NumberSlot}"
      ],
    },
  ],
  types: {
    AnySlot: {
      value: "[a-zA-Z]+"
    },
    NumberSlot: {
      value: "[0-9]+",
    },
  },
};


export default script;
