export default function checkIfNameAndTeamVariationAppearAtEqualTime(
  pureNameAppearanceCount,
  nameWithTeamAppearanceCount
) {
  if (pureNameAppearanceCount == 0 || nameWithTeamAppearanceCount == 0)
    return false;

  if (pureNameAppearanceCount == nameWithTeamAppearanceCount) return true;

  return false;
}
