export interface LinkButtonSettings {
  url: string;
  icon: string;
  style: {
    backgroundColor: string;
    color: string;
    borderRadius: string;
    padding: string;
  };
}

export interface LabelItem {
  id: string;
  text: string;
  style: {
    backgroundColor: string;
    color: string;
    fontSize: string;
    padding: string;
  };
}

export interface LabelPageSettings {
  style: {
    backgroundColor: string;
    color: string;
    fontFamily: string;
  };
  label: LabelItem[];
}

export interface Settings {
  personalImageName: string;
  personalImageSrc: string;
  linkButton: LinkButtonSettings;
  labelPage: LabelPageSettings;
}
