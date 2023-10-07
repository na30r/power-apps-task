import { IInputs, IOutputs } from "./generated/ManifestTypes";

export class task1Component implements ComponentFramework.StandardControl<IInputs, IOutputs> {
  private mainDiv: HTMLDivElement;
  private textBox: HTMLInputElement;
  private notify: () => void;
  private button: HTMLButtonElement;

  constructor() {}

  /**
   * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
   * Data-set values are not initialized here, use updateView.
   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
   * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
   * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
   * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
   */
  public init(
    context: ComponentFramework.Context<IInputs>,
    notifyOutputChanged: () => void,
    state: ComponentFramework.Dictionary,
    container: HTMLDivElement
  ): void {
    this.notify = notifyOutputChanged;
    this.mainDiv = document.createElement("div");
    this.textBox = document.createElement("input");
    this.button = document.createElement("button");
    this.button.innerHTML = "send";
    this.changePlaceholder(context);
    this.textBox.value = "";
    this.button.addEventListener("click", this.buttonClicked.bind(this));
    this.mainDiv.appendChild(this.textBox);
    this.mainDiv.appendChild(this.button);
    container.appendChild(this.mainDiv);
  }

  /**
   * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
   */
  public updateView(context: ComponentFramework.Context<IInputs>): void {
    this.changePlaceholder(context);
  }

  public getOutputs(): IOutputs {
    return {
      inputValue: this.textBox.value,
    };
  }

  public destroy(): void {
    // Add code to cleanup control if necessary
  }

  private buttonClicked(): void {
    this.notify();
  }

  private changePlaceholder(context: ComponentFramework.Context<IInputs>): void {
    this.textBox.placeholder = context.parameters.placeHolder.raw ?? "";
  }
}
