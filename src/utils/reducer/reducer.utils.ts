import {AnyAction} from "redux";

// ActionCreator is an action creator function that returns some action.
// the following is a type predicate, i.e. is like an extendable type for an action creator
// that gives the action creator (function) object a type property and match property.
// The type property is the same type as the action that the action creator returns.
// The match property is a method that verifies that an action (as a parameter) is the same type as
// the return type from the action creator.
type Matchable<ActionCreator extends () => AnyAction> = ActionCreator & {
    type: ReturnType<ActionCreator>['type'];
    match(action: AnyAction): action is ReturnType<ActionCreator>;
}

// This function is an overloaded function definition for withMatcher. It takes an generic argument of type
// ActionCreator, which in this case is an action creator that takes no arguments and returns
// an action with the type of the "type" param being string. The method returns an object
// of type Matchable, which is essentially an action creator function that has type and match() params.
export function withMatcher<ActionCreator extends () => AnyAction & { type: string }>(actionCreator: ActionCreator):
    Matchable<ActionCreator>;

// This function is an overloaded function definition for withMatcher. It takes an generic argument of type
// ActionCreator, which in this case is an action creator that takes any number of arguments and returns
// an action with the type of the "type" param being string. The method returns an object
// of type Matchable, which is essentially an action creator function that has type and match() params.
export function withMatcher<ActionCreator extends (...args: any[]) => AnyAction & { type: string }>(actionCreator: ActionCreator):
    Matchable<ActionCreator>;

// This is the function implementation of the overloaded declarations above. The input is an action creator (a function).
//
// This function basically just returns a Matchable type object (an action creator) whose match() method can be used to
// see if the action returned from the action creator is the same as some other action.
export function withMatcher(actionCreator: Function) {
    // Here, the variable "type" is the action type of the action returned from
    // the action creator parameter, such as FETCH_CATEGORIES_SUCCESS.
    const type = actionCreator().type;

    // This return constructs a new object of type Matchable.
    // The match function is to verify if the action passed in as a parameter is the same action as what is
    // returned from the actionCreator function. It does this by comparing the "type" variable declared above
    // (the "type" param of the action created from the action creator) and the "type" parameter of the action
    // passed in as a parameter.
    return Object.assign(actionCreator, {
        type,
        match(action: AnyAction) {
            return action.type === type;
        }
    })
}

export type ActionWithPayload<T, P> = {
    type: T;
    payload: P;
};

export type Action<T> = {
    type: T;
};

// payload: void means that payload is not expected as a parameter.
export function createAction<T extends string>(type: T, payload: void): Action<T>;

export function createAction<T extends string, P>(type: T, payload: P): ActionWithPayload<T, P>;

export function createAction<T extends string, P>(type: T, payload: P) {
    return {type, payload};
}
