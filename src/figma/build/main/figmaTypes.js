"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Enum describing how layer blends with layers below
 * This type is a string enum with the following possible values
 */
var BlendMode;
(function (BlendMode) {
    BlendMode[BlendMode["PASS_THROUGH"] = 0] = "PASS_THROUGH"; /** (Only applicable to objects with children) */
    BlendMode[BlendMode["NORMAL"] = 1] = "NORMAL";
    /** Darken: */
    BlendMode[BlendMode["DARKEN"] = 2] = "DARKEN";
    BlendMode[BlendMode["MULTIPLY"] = 3] = "MULTIPLY";
    BlendMode[BlendMode["LINEAR_BURN"] = 4] = "LINEAR_BURN";
    BlendMode[BlendMode["COLOR_BURN"] = 5] = "COLOR_BURN";
    /** Lighten: */
    BlendMode[BlendMode["LIGHTEN"] = 6] = "LIGHTEN";
    BlendMode[BlendMode["SCREEN"] = 7] = "SCREEN";
    BlendMode[BlendMode["LINEAR_DODGE"] = 8] = "LINEAR_DODGE";
    BlendMode[BlendMode["COLOR_DODGE"] = 9] = "COLOR_DODGE";
    /** Contrast: */
    BlendMode[BlendMode["OVERLAY"] = 10] = "OVERLAY";
    BlendMode[BlendMode["SOFT_LIGHT"] = 11] = "SOFT_LIGHT";
    BlendMode[BlendMode["HARD_LIGHT"] = 12] = "HARD_LIGHT";
    /** Inversion: */
    BlendMode[BlendMode["DIFFERENCE"] = 13] = "DIFFERENCE";
    BlendMode[BlendMode["EXCLUSION"] = 14] = "EXCLUSION";
    /** Component: */
    BlendMode[BlendMode["HUE"] = 15] = "HUE";
    BlendMode[BlendMode["SATURATION"] = 16] = "SATURATION";
    BlendMode[BlendMode["COLOR"] = 17] = "COLOR";
    BlendMode[BlendMode["LUMINOSITY"] = 18] = "LUMINOSITY";
})(BlendMode = exports.BlendMode || (exports.BlendMode = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlnbWFUeXBlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9maWdtYVR5cGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBeVVBOzs7R0FHRztBQUNILElBQVksU0E4Qlg7QUE5QkQsV0FBWSxTQUFTO0lBQ25CLHlEQUFjLENBQUEsQ0FBQyxpREFBaUQ7SUFDaEUsNkNBQVEsQ0FBQTtJQUVSLGNBQWM7SUFDZCw2Q0FBUSxDQUFBO0lBQ1IsaURBQVUsQ0FBQTtJQUNWLHVEQUFhLENBQUE7SUFDYixxREFBWSxDQUFBO0lBRVosZUFBZTtJQUNmLCtDQUFTLENBQUE7SUFDVCw2Q0FBUSxDQUFBO0lBQ1IseURBQWMsQ0FBQTtJQUNkLHVEQUFhLENBQUE7SUFFYixnQkFBZ0I7SUFDaEIsZ0RBQVMsQ0FBQTtJQUNULHNEQUFZLENBQUE7SUFDWixzREFBWSxDQUFBO0lBRVosaUJBQWlCO0lBQ2pCLHNEQUFZLENBQUE7SUFDWixvREFBVyxDQUFBO0lBRVgsaUJBQWlCO0lBQ2pCLHdDQUFLLENBQUE7SUFDTCxzREFBWSxDQUFBO0lBQ1osNENBQU8sQ0FBQTtJQUNQLHNEQUFZLENBQUE7QUFDZCxDQUFDLEVBOUJXLFNBQVMsR0FBVCxpQkFBUyxLQUFULGlCQUFTLFFBOEJwQiJ9