export class perfDataModel {
  constructor(datareceived) {
    const data = datareceived.data.map((element) => {
      let kindLabel;
      switch (element.kind) {
        case 1:
          kindLabel = "cardio";
          break;
        case 2:
          kindLabel = "énergie";
          break;
        case 3:
          kindLabel = "endurance";
          break;
        case 4:
          kindLabel = "force";
          break;
        case 5:
          kindLabel = "vitesse";
          break;
        case 6:
          kindLabel = "intensité";
          break;

        default:
          break;
      }
      return { value: element.value, kind: element.kind, kindLabel: kindLabel };
    });
    this.userId = datareceived.userId;
    this.kind = datareceived.kind;
    this.data = data;
  }
}
