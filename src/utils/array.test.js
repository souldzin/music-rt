import * as ArrayUtils from "./array";
import { expect } from "chai";

describe("utils/array", function(){
    describe(".range", function(){
        it("returns array with given length", function(){
            const result = ArrayUtils.range(5);

            expect(result).to.have.lengthOf(5);
        });
        it("returns array where each value is equal to index", function(){
            const result = ArrayUtils.range(5);

            expect(result).to.eql([0, 1, 2, 3, 4]);
        });
        it("returns empty array when given 0", function(){
            const result = ArrayUtils.range(0);

            expect(result).to.eql([]);
        });
    });
})